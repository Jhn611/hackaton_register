<script>
import { RouterLink, RouterView } from 'vue-router';
import SteckEl  from '../components/SteckEl.vue';
import { filterList } from '../search.js'
import SearchInput from '@/components/SearchInput.vue';

export default {
    data() {
        return{
            searchQuery: "",
            active: false,
            stecks:[ 
                {
                    id:"1",
                    name:"Хакатончик",
                    host:"Москва",
                    status:"1"
                },
                {
                    id:"2",
                    name:"Хакатончик 2",
                    host:"Москва",
                    status:"0"
                }
            ],
        }
    },
    components:{
        SteckEl,
        SearchInput,
    },
    computed: {
        filteredStecks() {
            return filterList(this.stecks, this.searchQuery);
        }
    },
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
            <div class="list_container">
                <SteckEl v-for="steck in filteredStecks" :key="steck" :steck_data="steck"/>
            </div>
        </div>
    </div>
    <RouterLink class="steck_main__link" to="/admin/banword"><img class="steck_main__link__img" src="../imgs/navigate_next.svg" alt=""></RouterLink>
</div>
</template>

<style></style>
