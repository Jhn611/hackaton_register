<script>
import { RouterLink, RouterView } from 'vue-router';
import BanWordEl from '@/components/BanWordEl.vue';
import { filterListOfString } from '../search.js'
import SearchInput from '@/components/SearchInput.vue';

export default {
    data() {
        return{
            searchQuery: "",
            active: false,
            destroy:false,
            banWords:[ 
                'хуй',
                'гитлер'
            ],
        }
    },
    components:{
        BanWordEl,
        SearchInput,
    },
    computed: {
        filteredWords() {
            return filterListOfString(this.banWords, this.searchQuery);
        }
    }, 
    methods:{
        removeComponent(valueToRemove){
            this.banWords = this.banWords.filter(item => item !== valueToRemove);
        }
    },
};
</script>

<template>
<div class="steck_main">
    <RouterLink class="steck_main__link" to="/admin/stecks"><img  class="steck_main__link__img" src="../imgs/navigate_next_reverse.svg" alt=""></RouterLink>
    <div class="steck_main__container">
        <div class="steck_main__discription">
            <h2 class="text-h2">список запретных слов</h2>
        </div>
        <div class="steck_main__adder">
            <SearchInput class="steck_main__search" v-model="searchQuery" />
        </div>
        <div class="steck_main__body">
            <div class="list_container">
                <BanWordEl v-for="words in filteredWords" :key="words" :word_data="words" @remove="removeComponent(words)"/>
            </div>
        </div>
    </div>
    <div class="steck_main__empty"></div>
</div>
</template>

<style></style>
