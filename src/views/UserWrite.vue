<script>
import { RouterLink, RouterView } from 'vue-router';
import { filterListHackatons } from '../search.js'
import SearchInput from '@/components/SearchInput.vue';
import { get_hackatons, get_stacks, hackaton_register } from '../API.js';
import Input from '../components/Input.vue';
import Adder from '../components/Adder.vue';
import Select from '../components/Select.vue';

export default {
    data() {
        return{
            load: false,
            token:"",
            searchQuery: "",
            modalActive: false,
            selectedStatus: "",
            selectedStackList: [],
            inputData:[
                {
                    headerText: "название команды",
                    placeholder: "команда 1",
                    inputText:"",
                    type:"text",
                },
                {
                    headerText: "тег капитана",
                    placeholder: "@vanya",
                    inputText:"",
                    type:"text",
                },
                {
                    headerText: "роль в команде",
                    placeholder: "Фронтэнд разработчик",
                    inputText:"",
                    type:"text",
                },
            ],
            options: [],
            stacks: [],
        }
    },
    components:{
        Input,
        SearchInput,
        Adder,
        Select
    },
    computed: {
        filteredHackatons() {
            return filterListHackatons(this.hackatons, this.searchQuery);
        }
    },
    methods:{
        openmodal(){
            this.modalActive = true;
        },
        async registerOnHackaton(){
            this.$refs.adder.getStacks();
            console.log(this.selectedStackList);
            try {
                this.load = true;
                let stecks_to_send = [];
                for(let i = 0; i < this.selectedStackList.length; i++){
                    stecks_to_send.push(this.selectedStackList[i].id);
                }
                console.log(this.inputData[0].inputText, this.inputData[1].inputText, this.inputData[2].inputText, this.selectedStatus, stecks_to_send);
                const stacks_list = await hackaton_register(this.inputData[0].inputText, this.inputData[1].inputText, this.inputData[2].inputText, this.selectedStatus, stecks_to_send, this.token);
                this.load = false;
            } catch {
                this.load = false;
            }
        },
        updateSelectedStecks(new_list){
            this.selectedStackList = new_list;
        },
        close(e) {
            if (!e.target.closest('.stack-selector')) { 
                this.modalActive = false;
            }
        },  
        async reload(){
            try {
                const stacks_list = await get_stacks(this.token);
                this.stacks = stacks_list;
            } catch {
                
            }
        },
    },
    async mounted(){
        document.addEventListener('click', this.close.bind(this))
        this.token = localStorage.getItem('token');
        try {
            this.load = true;
            const stacks_list = await get_stacks(this.token);
            this.stacks = stacks_list;
            if(this.stacks.length == 0){
                this.stacks = [{name:'Vue.js', id:-1}, {name:'React', id:-3}, {name:'Angular', id:-2}];
            }
            this.load = false;
        } catch {
            this.stacks = [{name:'Vue.js', id:0}, {name:'React', id:1}, {name:'Angular', id:2}];
            this.load = false;
        }

        try {
            this.load = true;
            const hackatons_list = await get_hackatons(this.token);
            for(let i = 0; i < hackatons_list.length; i++){
                if(hackatons_list[i].activity_status == 1){
                    this.options.push({value:hackatons_list[i].hackathon_id, label:hackatons_list[i].hackathon_name})
                }
            }
            this.load = false;
        } catch {
            this.options = [
                { value: 1, label: "Хакатон 1" },
                { value: 0, label: "Хакатон 2" },
            ];
            this.load = false;
        }
    }
};
</script>

<template>
<div class="user_main">
    <div class="user_main__body">
        <div class="user_main__discription">
            <h2 class="text-h2">запись</h2>
        </div>
        <div class="load_container" v-if="load"><img class="load_img" src="../imgs/Loader.svg"></div>
        <div v-if="!load" class="input_container">
            <Input v-for="i in inputData" :key="i" :headerText="i.headerText" :placeholder="i.placeholder" v-model="i.inputText" :type="i.type"/>
            <div class="input noicon_shift">
                <label for="status-select" class="input__text noicon_shift__text">Выберите статус:</label>
                <Select class="noicon_shift__input" v-model="selectedStatus" :options="options" />
            </div>
            <Adder v-model="modalActive" :list_of_el="stacks" ref="adder" @selected-stacks="updateSelectedStecks" @reload="reload"/>
            <button @click="registerOnHackaton" class="btn">Отправить <img src="../imgs/send.svg" alt=""></button>
        </div>
    </div>
</div>
</template>

<style></style>
