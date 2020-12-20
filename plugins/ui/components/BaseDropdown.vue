<template>
  <div 
    class="relative inline-block"
    ref="el"
  >
    <div
      class="cursor-pointer"
      @click="toggle"
    >
      <slot></slot>
    </div>
    <div
      class="
        absolute
        bg-white
        top-full
        shadow
        text-left
        border
        transform
        transition-all
        duration-100
        ease-in
        mt-2
        origin-top
      "
      :class="[
        state.show ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0',
        state.wide ? 'min-w-max' : 'min-w-full',
        state.align === 'left' ? 'left-0' : 'right-0'
      ]"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
import { ref, defineComponent, reactive, onMounted, onBeforeUnmount } from "vue"

export default defineComponent({
  name: 'BaseDropdown',
  props: {
    wide: {
      type: Boolean,
      default: true
    },
    align: {
      type: String,
      default: 'left'
    }
  },
  setup(props) {
    const el = ref(null);

    const state = reactive({
      show: false,
      wide: props.wide,
      align: props.align
    })

    const toggle = () => {
      state.show = !state.show;
    }

    const closeClick = (e) => {
      if (!el.value.contains(e.target)) {
        state.show = false;
      }
    }

    onMounted(() => {
      document.addEventListener('click', closeClick)
    });

    onBeforeUnmount(() => {
      document.removeEventListener('click', closeClick)
    });

    return {
      state,
      toggle,
      el
    }
  }
});
</script>
