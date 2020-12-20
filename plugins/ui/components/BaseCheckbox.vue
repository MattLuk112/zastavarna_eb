<template>
    <div class="
            inline-flex
        "
    >
        <div class="
            flex-auto
            w-4
            h-4
            cursor-pointer
            border
        "
            :class="[
                modelValue ? 'bg-green-600 text-white border-green-900' : 'bg-white text-gray-700 border-gray-400'
            ]"
            @click="toggle()"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'BaseCheckbox',
    
    emits: ['update:modelValue'],

    props: {
        modelValue: Boolean,
    },

    setup(props, { emit }) {

        const toggle = (value) => {
            if (props.modelValue) {
                emit('update:modelValue', false);
            } else {
                emit('update:modelValue', true);
            }
        }

        return {
            toggle
        }
    }
})
</script>
