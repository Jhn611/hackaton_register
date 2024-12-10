<script>

export default {
    data() {
        return{
            
        }
    },
    props: {
        modelValue: {
            type: String,
            required: true
        },
        headerText:"",
        placeholder:"",
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
<div class="input noicon_shift">
    <p class="input__text noicon_shift__text">{{ headerText }}</p>
    <input class="noicon_shift__input" :value="modelValue" @input="updateValue($event.target.value)" type="text" :placeholder="placeholder" />
    <img
        @click="clear()"
        class="input__img noicon_shift__img"
        src="../imgs/close.svg"
        alt=""
    />
</div>
</template>

<style></style>
