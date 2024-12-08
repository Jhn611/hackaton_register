<script>
export default {
    data() {
        return{

        }
    },
    props:{
        word_data:{},
    },
    methods:{
        destroy(){
            this.$emit("remove");
        }
    }
};
</script>

<template>
<div class="list-el">
    <p class="text-16">{{ word_data }}</p>
    <img @click="destroy" src="../imgs/close.svg" class="pointer">
</div>
</template>

<style src="../style.css"></style>
