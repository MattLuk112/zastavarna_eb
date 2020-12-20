<template>
    <div class="
            inline-flex
        "
    >
        <div
            v-for="color in colors"
            :key="color"
            class="
                border
                h-6
                w-6
                p-1
                relative
                mr-2
                hover:border-gray-600
                hover:bg-gray-100
                hover:border-gray-600
                cursor-pointer
            "
            :class="[
                modelValue === color ? 'bg-gray-100 border-gray-600' : 'border-gray-400 bg-white'
            ]"
            @click="select(color)"
        >
            <div class="absolute border top-0.5 bottom-0.5 right-0.5 left-0.5" :style="{
                backgroundColor: color
            }"></div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BaseColorPicker',
    
    emits: ['update:modelValue'],

    props: {
        modelValue: String,
        colors: {
            type: Array,
            default: [
                '#ffffff',
                '#ff0000',
                '#00ff00',
                '#0000ff',
                '#ccff00',
            ]
        }
    },

    setup(props, { emit }) {

        const select = (value) => {
            emit('update:modelValue', value);
        }

        return {
            select
        }
    }
})
</script>
