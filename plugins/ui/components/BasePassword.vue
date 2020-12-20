<template>
    <div 
        class="
            flex
            relative
            group
            text-gray-700 
            bg-white border 
            border-gray-400 
            hover:text-gray-900 
            focus-within:text-gray-900 
            focus-within:border-gray-500 
            hover:border-gray-500
        "
    >
        <input 
            :type="state.type"
            class="
                flex-auto
                px-4
                py-2
                focus:outline-none 
            "
            :placeholder="placeholder"
            @input="onInput"
        >
        <div 
        class="
            flex-auto
            flex
            items-center
            w-8 
            px-2 
            flex-grow-0 
            cursor-pointer 
            select-none
        " 
            @click="toggleShow"
        >
            <icon-eye v-if="state.type === 'password'" class="w-4 h-4"></icon-eye>
            <icon-eye-off v-else-if="state.type === 'text'" class="w-4 h-4"></icon-eye-off>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    name: 'BasePassword',
    
    emits: ['update:modelValue'],

    props: {
        modelValue: String,
        placeholder: {
            type: String,
            default: null
        },
    },

    setup(props, { emit }) {

        const onInput = (event) => {
            emit('update:modelValue', event.target.value);
        }

        const state = reactive({
            type: 'password'
        })

        const toggleShow = function() {
            console.log(state.type, state.type === 'password')
            state.type = state.type === 'password' ? 'text' : 'password'
        }

        return {
            onInput,
            state,
            toggleShow
        }
    }
})
</script>
