<script>
import Input from './Input.vue';
import Select from './Select.vue';
import { add_hackaton } from '../API.js';

export default {
    data() {
        return{
            selectedStatus: 1,
            inputData:[
                {
                    headerText: "Название хакатона",
                    placeholder: "Хакатон",
                    inputText:""
                },
                {
                    headerText: "Город проведения",
                    placeholder: "Москва",
                    inputText:""
                },
            ],
            options: [
            { value: 1, label: "Активный" },
            { value: 0, label: "Неактивный" },
            ],
        }
    },
    components:{
        Input,
        Select,
    },
    props: {
        modelValue: {
            type: String,
            required: true
        }
    },
    emits: ['update:modelValue'],
    methods: {
        close(){
            this.$emit('update:modelValue', false);
        },
        async add(){
            console.log(this.selectedStatus);
            if(this.inputData[0].inputText != "" && this.inputData[0].inputText && this.inputData[1].inputText != "" && this.inputData[1].inputText){
                await add_hackaton(this.inputData[0].inputText, this.inputData[1].inputText, this.selectedStatus);
            } 
            this.$emit('update:modelValue', false);
        },
    },
};
</script>

<template>
<div class="adder">
<div @click="close" class="adder__bg"></div>
<div class="adder__form">
    <Input v-for="i in inputData" :key="i" :headerText="i.headerText" :placeholder="i.placeholder" v-model="i.inputText"/>
    <div class="input noicon_shift">
        <label for="status-select" class="input__text noicon_shift__text">Выберите статус:</label>
        <Select class="noicon_shift__input" v-model="selectedStatus" :options="options" />
    </div>
    <button @click="add" class="btn">Добавить <img src="../imgs/send.svg" alt=""></button>
</div>
</div>
</template>

<style></style>
