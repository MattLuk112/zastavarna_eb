<template>
    <div>
        <input
            type="range"
            class="
                flex-auto 
                items-center 
                px-4 
                py-2 
                w-full
                focus:outline-none 
                placeholder-gray-400
                text-gray-700 
                bg-white border 
                border-gray-400 
                hover:text-gray-900 
                focus:text-gray-900 
                focus:border-gray-500 
                hover:border-gray-500
            "
            @input="onInput"
            :placeholder="placeholder"
            :min="min"
            :max="max"
            :step="step"
        >
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BaseSlider',
    
    emits: ['update:modelValue'],

    props: {
        modelValue: String,
        placeholder: {
            type: String,
            default: null
        },
        min: {
            type: Number,
            default: null
        },
        max: {
            type: Number,
            default: null
        },
        step: {
            type: Number,
            default: null
        }
    },

    setup(props, { emit }) {

        const onInput = (event) => {
            emit('update:modelValue', event.target.value);
        }

        return {
            onInput
        }
    }
})
</script>
