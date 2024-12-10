<script>
import { RouterLink, RouterView } from 'vue-router';
import UserEl  from '../components/UserEl.vue';
import { filterListByTag } from '../search.js'
import SearchInput from '@/components/SearchInput.vue';
import { get_users } from '../API.js';

export default {
    data() {
        return{
            load: false,
            searchQuery: "",
            users:[]
        }
    },
    components:{
        UserEl,
        SearchInput,
    },
    computed: {
        filteredUsers() {
            return filterListByTag(this.users, this.searchQuery);
        }
    },
    async mounted(){
        try{
           this.load = true;
           const users_list = await get_users();
           this.users = users_list;
           this.load = false;
        }catch{
            this.users = [ 
                {
                    user_id:1,
                    telegram_tag:"Алёша",
                },
                {
                    user_id:2,
                    telegram_tag:"Ваня",
                }
            ];
            this.load = false;
        }
    }
};
</script>

<template>
<div class="users_main">
    <div class="users_main__discription">
        <h2 class="text-h2">список всех пользователей</h2>
    </div>
    <div class="users_main__search">
        <SearchInput v-model="searchQuery"  />
    </div>
    <div class="users_main__body">
        <div class="load_container" v-if="load"><img class="load_img" src="../imgs/Loader.svg"></div>
        <div v-if="!load" class="list_container">
            <UserEl v-for="user in filteredUsers" :key="user" :user_data="user"/>
        </div>
    </div>
</div>
</template>

<style></style>
