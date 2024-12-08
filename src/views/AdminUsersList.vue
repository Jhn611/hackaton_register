<script>
import { RouterLink, RouterView } from 'vue-router';
import UserEl  from '../components/UserEl.vue';
import { filterList } from '../search.js'
import SearchInput from '@/components/SearchInput.vue';

export default {
    data() {
        return{
            searchQuery: "",
            users:[ 
                {
                    id:"1",
                    name:"Алёша",
                    host:"Москва",
                    status:"1"
                },
                {
                    id:"2",
                    name:"Ваня",
                    host:"Москва",
                    status:"0"
                }
            ]
        }
    },
    components:{
        UserEl,
        SearchInput,
    },
    computed: {
        filteredUsers() {
            return filterList(this.users, this.searchQuery);
        }
    },
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
        <div class="list_container">
            <UserEl v-for="user in filteredUsers" :key="user" :user_data="user"/>
        </div>
    </div>
</div>
</template>

<style></style>
