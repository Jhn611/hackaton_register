<script>
import { RouterLink, RouterView } from 'vue-router';
import HackatonEl  from '../components/HackatonEl.vue';
import { filterListHackatons } from '../search.js'
import SearchInput from '@/components/SearchInput.vue';
import HackatonAdder from '@/components/HackatonAdder.vue';
import { get_hackatons } from '../API.js';

export default {
    data() {
        return{
            token:'',
            load: false,
            searchQuery: "",
            modalActive: false,
            hackatons:[]
        }
    },
    components:{
        HackatonEl,
        SearchInput,
        HackatonAdder,
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
                const hackatons_list = await get_hackatons(this.token);
                this.hackatons = hackatons_list;
                this.load = false;
            } catch {
                console.log("error");
                this.load = false;
            }
        },
    },
    watch: {
        async modalActive(newValue, oldValue) {
            if (newValue === false) {
                try {
                    this.load = true;
                    const hackatons_list = await get_hackatons(this.token);
                    this.load = false;
                    this.hackatons = hackatons_list;
                }catch{
                    console.log('Ошибка обновления данных о хакатонах.')
                    this.load = false;
                }
            }
        },
    },
    async mounted(){
        this.token = localStorage.getItem('token');
        try {
            this.load = true;
            const hackatons_list = await get_hackatons(this.token);
            this.hackatons = hackatons_list;
            this.load = false;
        } catch {
            this.hackatons = [ 
                {
                    hackathon_id:"1",
                    hackathon_name:"Хакатончик",
                    host_hackathon:"Питер",
                    activity_status:1
                },
                {
                    hackathon_id:2,
                    hackathon_name:"Хакатончик 2",
                    host_hackathon:"Москва",
                    activity_status:0
                }
            ];
            this.load = false;
        }
    }
};
</script>

<template>
<div class="hackaton_main">
    <div class="hackaton_main__discription">
        <h2 class="text-h2">список хакатонов</h2>
    </div>
    <div class="hackaton_main__adder">
        <SearchInput v-model="searchQuery" />
        <div @click="openmodal" class="add_btn"><img class="add_plus" src="../imgs/add.svg" alt=""></div>
    </div>
    <div class="hackaton_main__body">
        <div class="load_container" v-if="load"><img class="load_img" src="../imgs/Loader.svg"></div>
        <div v-if="!load" class="list_container">
            <HackatonEl v-for="hack in filteredHackatons" :key="hack" :hackaton_data="hack" @update="reload" :isAdmin="true"/>
            <HackatonAdder v-if="modalActive" v-model="modalActive" />
        </div>
    </div>
</div>
</template>

<style></style>
