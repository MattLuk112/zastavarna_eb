<template>
  <div 
    class="
      inline-flex 
      items-center 
      px-4 
      py-2 
      text-sm 
      font-medium 
      leading-5 
      text-gray-700 
      bg-white border 
      border-gray-400 
      rounded-md group 
      hover:text-gray-900 
      focus:outline-none 
      focus:text-gray-900 
      focus:border-gray-500 
      hover:border-gray-500
      cursor-pointer
    ">
    {{ placeholder }}
    <slot></slot>
  </div>
</template>
<script>
import { defineComponent } from "vue"

export default defineComponent({
  name: 'BaseSelect',
  props: {
    placeholder: {
      type: String,
      default: null
    }
  },
  setup(props) {

    return {
      placeholder: props.placeholder
    }
  }
});
</script>
