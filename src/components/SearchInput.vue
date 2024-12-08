<script>
import { RouterLink, RouterView } from 'vue-router';
import HackatonEl  from '../components/HackatonEl.vue';
import { filterList } from '../search.js'

export default {
    data() {
        return{
            
        }
    },
    props: {
        modelValue: {
            type: String,
            required: true
        }
    },
    emits: ['update:modelValue'],
    methods: {
        updateValue(newValue) {
            this.$emit('update:modelValue', newValue);
        },
        clear(){
            console.log("clear!");
            this.$emit('update:modelValue', "");
        }
    },
};
</script>

<template>
<div class="input">
    <img
        class="input__prev_img"
        src="../imgs/search.svg"
        alt=""
    />
    <p class="input__text">Поиск</p>
    <input :value="modelValue" @input="updateValue($event.target.value)" type="text" placeholder="Введите ключевые слова" />
    <img
        @click="clear()"
        class="input__img"
        src="../imgs/close.svg"
        alt=""
    />
</div>
</template>

<style></style>
