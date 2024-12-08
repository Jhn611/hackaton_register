<script>
export default {
    data() {
        return{

        }
    },
    props:{
        hackaton_data:{}
    }
};
</script>

<template>
<div class="list-el">
    <p class="text-16">{{ hackaton_data.name }}</p>
    <div class="list-status">
        <div class="list-el__country">{{ hackaton_data.host }}</div>
        <div :class="{red: hackaton_data.status == '0'}" class="list-el__status">{{ hackaton_data.status == "1" ? "активный" : "неактивный" }}</div>
    </div>
</div>
</template>

<style src="../style.css"></style>
