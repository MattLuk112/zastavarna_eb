<template>
    <div class="
            inline-flex
        "
    >
        <div class="
            flex-auto
            px-4
            py-2
            cursor-pointer
            border
            border-r-0
        "
            :class="[
                modelValue ? 'bg-green-600 text-white border-green-600' : 'bg-gray-200 text-gray-700 border-gray-400'
            ]"
            @click="select(true)"
        >
            On
        </div>
        <div class="
            flex-auto
            px-4
            py-2
            cursor-pointer
            border
            border-l-0
        "
            :class="[
                !modelValue ? 'bg-green-600 text-white border-green-600' : 'bg-gray-200 text-gray-700 border-gray-400'
            ]"
            @click="select(false)"
        >
            Off
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BaseOnOff',
    
    emits: ['update:modelValue'],

    props: {
        modelValue: Boolean,
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
