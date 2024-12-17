<script>
import Input from './Input.vue';
import Select from './Select.vue';
import { add_hackaton } from '../API.js';

export default {
    data() {
        return{
            token:'',
            selectedStatus: 1,
            inputData:[
                {
                    headerText: "название хакатона",
                    placeholder: "Хакатон",
                    inputText:"",
                    type:"text",
                },
                {
                    headerText: "город проведения",
                    placeholder: "Москва",
                    inputText:"",
                    type:"text",
                },
                {
                    headerText: "дата проведения",
                    placeholder: "",
                    inputText:"",
                    type:"date",
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
            if(this.inputData[0].inputText != "" && this.inputData[0].inputText && this.inputData[1].inputText != "" && this.inputData[1].inputText && this.inputData[2].inputText != "" && this.inputData[2].inputText){
                console.log(this.inputData[0].inputText, this.inputData[1].inputText, this.selectedStatus)
                await add_hackaton(this.inputData[0].inputText, this.inputData[1].inputText, this.selectedStatus, this.inputData[2].inputText, this.token);
            } 
            this.$emit('update:modelValue', false);
        },
    },
    mounted(){
      this.token = localStorage.getItem('token');
    },
};
</script>

<template>
<div class="adder">
<div @click="close" class="adder__bg"></div>
<div class="adder__form">
    <Input v-for="i in inputData" :key="i" :headerText="i.headerText" :placeholder="i.placeholder" v-model="i.inputText" :type="i.type"/>
    <div class="input noicon_shift">
        <label for="status-select" class="input__text noicon_shift__text">Выберите статус:</label>
        <Select class="noicon_shift__input" v-model="selectedStatus" :options="options" />
    </div>
    <button @click="add" class="btn">Добавить <img src="../imgs/send.svg" alt=""></button>
</div>
</div>
</template>

<style></style>
