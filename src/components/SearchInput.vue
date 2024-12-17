<script>
export default {
    data() {
        return{
            inputValue:"Введите ключевые слова",
        }
    },
    props: {
        modelValue: {
            type: String,
            required: true
        },
        text: {
            type: String,
            required: false
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
    mounted(){
        if(this.text && this.text != ''){
            this.inputValue = this.text;
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
    <input :value="modelValue" @input="updateValue($event.target.value)" type="text" :placeholder="inputValue" />
    <img
        @click="clear()"
        class="input__img"
        src="../imgs/close.svg"
        alt=""
    />
</div>
</template>

<style></style>
