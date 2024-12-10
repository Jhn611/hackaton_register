<script>
import { RouterLink, RouterView } from 'vue-router';
import BanWordEl from '@/components/BanWordEl.vue';
import { filterListByWord } from '../search.js'
import SearchInput from '@/components/SearchInput.vue';
import { get_ban_words, add_ban_words, delete_ban_words } from "../API.js";

export default {
    data() {
        return{
            load: false,
            searchQuery: "",
            active: false,
            destroy:false,
            banWords:[],
        }
    },
    components:{
        BanWordEl,
        SearchInput,
    },
    computed: {
        filteredWords() {
            return filterListByWord(this.banWords, this.searchQuery);
        }
    }, 
    methods:{
        async removeComponent(valueToRemove){
            try{
                this.load = true;
                await delete_ban_words(valueToRemove.word);
                this.banWords = this.banWords.filter(item => item !== valueToRemove);
                this.load = false;
            }catch{
                console.log("error");
                this.load = false;
            }
        },
        async reload(){
            try {
                this.load = true;
                const banwordsList = await get_ban_words();
                this.banWords = banwordsList;
                this.load = false;
            } catch {
                console.log("error reload banwords");
                this.load = false;
            }
        },
        async add(variable){
            await add_ban_words(variable);
            this.searchQuery = '';
            await this.reload();
        }
    },
    async mounted(){
        try {
            this.load = true;
            const banwordsList = await get_ban_words();
            this.banWords = banwordsList;
            this.load = false;
        } catch {
            this.banWords = [
                { id: 0, word: 'свастон' },
                { id: 1, word: 'гитлер' },
            ];
            this.load = false;
        }
    }
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
            <div @click="add(searchQuery)" class="add_btn"><img class="add_plus" src="../imgs/add.svg" alt=""></div>
        </div>
        <div class="steck_main__body">
            <div class="load_container" v-if="load"><img class="load_img" src="../imgs/Loader.svg"></div>
            <div v-if="!load" class="list_container">
                <BanWordEl v-for="word_data in filteredWords" :key="word_data.id" :word_data="word_data" @remove="removeComponent(word_data)"/>
            </div>
        </div>
    </div>
    <div class="steck_main__empty"></div>
</div>
</template>

<style></style>
