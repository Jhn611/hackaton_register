<script>
import { change_status_hackaton } from '../API.js'
export default {
    data() {
        return{

        }
    },
    props:{
        hackaton_data:{},
        isAdmin:{
            type: Boolean,
            required: true
        }
    },
    methods:{
        async change_activity(variable){ 
            if(this.isAdmin){
                await change_status_hackaton(variable, this.token); 
                this.$emit("update");  
            }       
        }
    },
    mounted(){
      this.token = localStorage.getItem('token');
    },
};
</script>

<template>
<div class="list-el list-el-hackaton">
    <p class="text-16">{{ hackaton_data.hackathon_name }}</p>
    <p class="text-16">{{ hackaton_data.event_date }}</p>
    <div class="list-status">
        <div class="list-el__country">{{ hackaton_data.host_hackathon }}</div>
        <div @click="change_activity(hackaton_data.hackathon_id)" :class="{red: hackaton_data.activity_status === 0}" class="list-el__status pointer">{{ hackaton_data.activity_status == 1 ? "активный" : "неактивный" }}</div>
    </div>
</div>
</template>

<style src="../style.css"></style>
