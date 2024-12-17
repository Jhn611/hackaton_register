<script>
import { RouterLink, RouterView } from 'vue-router';
import HackatonEl  from '../components/HackatonEl.vue';
import { filterListHackatons } from '../search.js'
import SearchInput from '@/components/SearchInput.vue';
import { get_my_hackatons } from '../API.js';

export default {
    data() {
        return{
            token:'',
            load: false,
            searchQuery: "",
            hackatons:[],
            name: "",
            tg_id: 0,
        }
    },
    components:{
        HackatonEl,
        SearchInput
    },
    computed: {
        filteredHackatons() {
            return filterListHackatons(this.hackatons, this.searchQuery);
        }
    },
    methods:{
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
    async mounted(){
        this.token = localStorage.getItem('token');
        const tg_tag = localStorage.getItem("telegram_tag");
        if(tg_tag && tg_tag != ""){
            this.name = tg_tag;
        }
        const teleg_id = localStorage.getItem("telegram_id");
        if(teleg_id && teleg_id != ""){
            this.tg_id = teleg_id;
        }
        console.log(this.name);
        try {
            this.load = true;
            const hackatons_list = await get_my_hackatons(this.tg_id, this.token);
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
<div class="user_main">
    <div class="user_main__body ">
        <div class="user_main__discription">
            <h2 class="text-h2">список хакатонов</h2>
        </div>
        <div class="hackaton_main__adder">
            <SearchInput v-model="searchQuery" />
        </div>
        <div class="load_container" v-if="load"><img class="load_img" src="../imgs/Loader.svg"></div>
        <div v-if="!load" class="list_container__user">
            <HackatonEl v-for="hack in filteredHackatons" :key="hack" :hackaton_data="hack" @update="reload" :isAdmin="false"/>
        </div>
    </div>
</div>
</template>

<style></style>
