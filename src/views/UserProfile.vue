<script>
import { RouterLink, RouterView } from 'vue-router';
import { filterListHackatons } from '../search.js'
import SearchInput from '@/components/SearchInput.vue';
import { set_user_profile, get_profile } from '../API.js';
import Input from '../components/Input.vue';

export default {
    data() {
        return{
            load: false,
            searchQuery: "",
            modalActive: false,
            inputData:[
                {
                    headerText: "имя",
                    placeholder: "Иван",
                    inputText:"",
                    type:"text",
                },
                {
                    headerText: "фамилия",
                    placeholder: "Иванович",
                    inputText:"",
                    type:"text",
                },
                {
                    headerText: "телеграмм тег",
                    placeholder: "@vanya",
                    inputText:"",
                    type:"text",
                },
                {
                    headerText: "учебная группа",
                    placeholder: "ЭФБО-02-23",
                    inputText:"",
                    type:"text",
                },
            ],
        }
    },
    components:{
        Input,
        SearchInput
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
        async reload(){
            try {
                this.load = true;
                const hackatons_list = await get_hackatons();
                this.hackatons = hackatons_list;
                this.load = false;
            } catch {
                console.log("error");
                this.load = false;
            }
        },
        async send(){
            try {
                this.load = true;
                const sended = await set_user_profile(this.inputData[0].inputText, this.inputData[1].inputText, this.inputData[3].inputText, this.inputData[2].inputText);
                this.load = false;
            } catch {
                console.log("error");
                this.load = false;
            }
        }
    },
    async mounted(){
        try {
            this.load = true;
            const data_list = await get_profile();
            this.inputData[0].inputText = data_list.first_name;
            this.inputData[1].inputText = data_list.last_name;
            this.inputData[2].inputText = data_list.tag_telegram;
            this.inputData[3].inputText = data_list.group;
            this.load = false;
        } catch {
            this.load = false;
        }
    }
};
</script>

<template>
<div class="user_main">
    <div class="user_main__body user_main__small">
        <div class="user_main__discription">
            <h2 class="text-h2">профиль</h2>
        </div>
        <div class="load_container" v-if="load"><img class="load_img" src="../imgs/Loader.svg"></div>
        <div v-if="!load" class="input_container__profile input_container__small">
            <Input v-for="i in inputData" :key="i" :headerText="i.headerText" :placeholder="i.placeholder" v-model="i.inputText" :type="i.type"/>
            <button @click="send" class="btn">Отправить <img src="../imgs/send.svg" alt=""></button>
        </div>
    </div>
</div>
</template>

<style></style>
