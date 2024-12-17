<script>
import SearchInput from './SearchInput.vue';
import { add_stack } from '../API.js';

export default {
    name: 'StackSelector',
    data() {
      return {
        token:'',
        maxStacks: 10,
        selectedStacks: [],
        searchQuery: ''
      };
    },
    components:{
        SearchInput,
    },
    props:{
        modelValue: {
            type: Boolean,
            required: true
        },
        list_of_el: {
            type: Array,
            required: true
        },
    },
    emits: ['update:modelValue'],
    computed: {
      filteredStacks() {
        return this.list_of_el.filter(stack => 
          stack.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
    },
    methods: {
      async addStack(stack) {
        if (this.selectedStacks.length < this.maxStacks && !this.selectedStacks.includes(stack)) {
          if(typeof stack === "string"){
            this.$emit('update:modelValue', false);
            const new_stack = await add_stack(this.searchQuery, this.token);
            this.selectedStacks.push({id:new_stack, name:stack});
            this.$emit('reload');
          }else{
            this.selectedStacks.push(stack);
          }
        }
        this.$emit('update:modelValue', false);
        this.searchQuery = '';
      },
      getStacks() {
        this.$emit("selected-stacks", this.selectedStacks);
      },
      removeStack(index) {
        this.selectedStacks.splice(index, 1);
      }
    },
    mounted(){
      this.token = localStorage.getItem('token');
    },
  };
</script>
  

<template>
<div class="stack-selector">
    <p class="input__text noicon_shift__text">стек технологий</p>
    <div class="selected-stacks">
        <span v-for="(stack, index) in selectedStacks" :key="index" class="stack-item" @click="removeStack(index)">
        {{ stack.name }}
        </span>
        <button 
            v-if="selectedStacks.length < maxStacks"
            class="add-button" 
            @click="this.$emit('update:modelValue', true);">
            +
        </button>
    </div>
    <div v-if="modelValue" class="stack-options">
        <h3 class="modal-h3">выберите стек</h3>
        <div class="flex-row">
            <SearchInput class="input__small" v-model="searchQuery" :text="'Vue'"/>
            <div @click="addStack(searchQuery)" class="add_btn__mini"><img class="add_plus" src="../imgs/add.svg" alt=""></div>
        </div>
        <ul class="ul">
          <li 
              v-for="stack in filteredStacks.slice(0, 5)" 
              :key="stack" 
              @click="addStack(stack)" 
              class="stack-option">
              {{ stack.name }}
          </li>
        </ul>
    </div>
</div>
</template>
  
<style src="../style.css"></style>
  