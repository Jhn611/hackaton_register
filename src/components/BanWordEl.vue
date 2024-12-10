<script>
export default {
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
    <p class="text-16">{{ word_data.word }}</p>
    <img  @click="destroy" src="../imgs/close.svg" class="pointer img_color">
</div>
</template>

<style src="../style.css"></style>
