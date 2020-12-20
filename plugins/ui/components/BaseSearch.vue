<template>
    <div>
        <input
            type="search"
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
            :placeholder="placeholder"
            @input="onInput"
        >
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BaseSearch',
    
    emits: ['update:modelValue'],

    props: {
        modelValue: String,
        placeholder: {
            type: String,
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
