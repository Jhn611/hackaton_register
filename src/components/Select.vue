<template>
    <div class="custom-select">
      <div class="selected" @click="toggleDropdown">
        {{ getSelectedLabel }}
        <span class="select-img" :class="{ open: isOpen }"> <img src="../imgs/select.svg" alt=""> </span>
      </div>
      <ul v-if="isOpen" class="dropdown">
        <li
          v-for="(option, index) in options"
          :key="index"
          :class="{ active: option.value === modelValue }"
          @click="selectOption(option.value)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: false,
      };
    },
    props:{
        modelValue: {
            type: String,
            required: true
        },
        options:[],
    },
    emits: ['update:modelValue'],
    computed: {
      getSelectedLabel() {
        const selectedOption = this.options.find(
          (option) => option.value === this.modelValue
        );
        return selectedOption ? selectedOption.label : "Выберите...";
      },
    },
    methods: {
      toggleDropdown() {
        this.isOpen = !this.isOpen;
      },
      selectOption(value) {
        this.isOpen = false;
        this.$emit('update:modelValue', value);
      },
      close(e) {
        if (!this.$el.contains(e.target) && !e.target.closest('.dropdown-toggle') && !e.target.closest('.theme_switch__bg')) { 
            this.isOpen = false;
        }
      },
    },
    mounted() {
        document.addEventListener('click', this.close.bind(this))
    },
  };
  </script>
  
<style src="../style.css"></style>
  