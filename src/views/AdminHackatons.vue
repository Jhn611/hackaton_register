<script>
import { RouterLink, RouterView } from 'vue-router';
import HackatonEl  from '../components/HackatonEl.vue';
import { filterList } from '../search.js'
import SearchInput from '@/components/SearchInput.vue';
import HackatonAdder from '@/components/HackatonAdder.vue';

export default {
    data() {
        return{
            searchQuery: "",
            modalActive: false,
            hackatons:[ 
                {
                    id:"1",
                    name:"Хакатончик",
                    host:"Питер",
                    status:"1"
                },
                {
                    id:"2",
                    name:"Хакатончик 2",
                    host:"Москва",
                    status:"0"
                }
            ]
        }
    },
    components:{
        HackatonEl,
        SearchInput,
        HackatonAdder,
    },
    computed: {
        filteredHackatons() {
            return filterList(this.hackatons, this.searchQuery);
        }
    },
    methods:{
        openmodal(){
            this.modalActive = true;
        },  
    },
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
        <div class="list_container">
            <HackatonEl v-for="hack in filteredHackatons" :key="hack" :hackaton_data="hack"/>
            <HackatonAdder v-if="modalActive" v-model="modalActive" />
        </div>
    </div>
</div>
</template>

<style></style>
