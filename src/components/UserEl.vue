<script>
export default {
    data() {
        return{

        }
    },
    props:{
        user_data:{}
    }
};
</script>

<template>
<div class="list-el">
    <p class="text-16">{{ user_data.name }}</p>
</div>
</template>

<style src="../style.css"></style>
