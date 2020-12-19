<template>
  <div
    class="
      flex
      items-center
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
      type="text" 
      :placeholder="placeholder"
      class="
        flex-auto 
        items-center 
        px-4 
        py-2 
        text-sm 
        font-medium 
        leading-5 
        rounded-md 
        group 
        focus:outline-none 
        cursor-pointer
      "
      @focus="showOptions"
      />
    <div class="w-8 px-2 flex-grow-0">
      <icon-chevron-down></icon-chevron-down>
    </div>
    <div
      class="
        absolute
        top-full
        left-0
        right-0
        bg-white
        mt-1
        z-10
        border
      "
      style="margin-left: -1px; margin-right: -1px;"
      :class="[
        state.show ? 'block' : 'hidden'
      ]"
    >
      <div 
        v-for="option in options"
        :key="option.value"
        class="px-2 py-2 cursor-pointer hover:bg-gray-100"
        @click="select(option.value)"
      >
        {{ option.value }} : {{ option.label }}
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, reactive } from "vue"

export default defineComponent({
  name: 'BaseSelect',
  props: {
    placeholder: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: []
    },
    'modelValue': {
      type: String,
      default: null
    },
  },
  setup(props, { emit }) {

    const state = reactive({
      show: false
    })

    const showOptions = () => {
      state.show = true;
    }

    const hideOptions = () => {
      state.show = false
    }

    const toggleOptions = () => {
      if (state.show) {
        hideOptions();
      } else {
        showOptions();
      }
    }

    const select = (value) => {
      emit('update:modelValue', value);
      hideOptions();
    }

    const options = computed(() => {
      return props.options.map(option => {
        if (typeof option.value === 'function') {
          option.value = option.value();
        }
        if (typeof option.label === 'function') {
          option.label = option.label();
        }
        return option;
      });
    });

    return {
      options,
      placeholder: props.placeholder,
      select,
      state,
      showOptions,
      hideOptions,
      toggleOptions,
      modelValue: props.modelValue
    }
  }
});
</script>
