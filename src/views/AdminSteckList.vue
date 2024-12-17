<script>
import { RouterLink, RouterView } from 'vue-router';
import SteckEl  from '../components/SteckEl.vue';
import { filterListByName } from '../search.js'
import SearchInput from '@/components/SearchInput.vue';
import { get_stacks } from '../API.js';

export default {
    data() {
        return{
            load: false,
            searchQuery: "",
            active: false,
            stecks:[],
        }
    },
    components:{
        SteckEl,
        SearchInput,
    },
    computed: {
        filteredStecks() {
            return filterListByName(this.stecks, this.searchQuery);
        }
    },
    async mounted(){
        try{
            this.load = true;
            const stecks_list = await get_stacks();
            this.stecks = stecks_list;
            this.load = false;
        }catch{
            this.stecks = [ 
                {
                    id:"1",
                    name:"Стек",
                },
                {
                    id:"2",
                    name:"Стек2",
                }
            ];
            this.load = false;
        }
    }
};
</script>

<template>
<div class="steck_main">
    <div class="steck_main__empty"></div>
    <div class="steck_main__container">
        <div class="steck_main__discription">
            <h2 class="text-h2">список стеков</h2>
        </div>
        <div class="steck_main__adder">
            <SearchInput class="steck_main__search" v-model="searchQuery" />
        </div>
        <div class="steck_main__body">
            <div class="load_container" v-if="load"><img class="load_img" src="../imgs/Loader.svg"></div>
            <div v-if="!load" class="list_container">
                <SteckEl v-for="steck in filteredStecks" :key="steck" :steck_data="steck"/>
            </div>
        </div>
    </div>
    <RouterLink class="steck_main__link" to="/admin/banword"><img class="steck_main__link__img" src="../imgs/navigate_next.svg" alt=""></RouterLink>
</div>
</template>

<style></style>
