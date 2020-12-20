<template>
  <div
    ref="el"
    class="
      flex
      items-stretch
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
    <!-- Value -->
    <div 
      class="
      flex
      items-center
      absolute
      left-0
      right-8
      top-0
      bottom-0
      px-4
      pr-0 
      py-2
      bg-white
      pointer-events-none
      group-focus:hidden
      "
      :class="[
        state.show ? 'hidden' : 'block'
      ]"
      v-if="modelLabel"
    >
      {{ modelLabel }}
    </div>

    <!-- Input -->
    <input
      v-if="filterable"
      type="text" 
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
        placeholder-gray-400
      "
      @focus="showOptions"
      :placeholder="placeholder"
      v-model="state.search"
      />
    <div
      @click="showOptions"
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
        text-gray-400
      "
      v-else>
      {{ shownValue }}
    </div>
    <div class="
      flex-auto
      flex
      items-center
      w-8 
      px-2 
      flex-grow-0 
      cursor-pointer 
      select-none
    " @click="toggleOptions">
      <icon-chevron-down class="w-4 h-4"></icon-chevron-down>
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
      <template
        v-for="(option, optionindex) in options"
        :key="optionindex"
      >
        <div 
          v-if="option.value"
          @click="select(option.value)"
          class="
          px-4 
          py-2 
          cursor-pointer 
          hover:bg-gray-100
          select-none
          "
          :class="[
            option.value === modelValue ? 'font-bold' : 'font-regular'
          ]"
        >
          {{ option.label }}
        </div>
        <div
          v-if="option.children"
        >
          <div 
            class="
            font-bold
            px-4 
            py-2 
            bg-gray-200"
          >
            {{ option.label }}
          </div>
          <div 
            v-for="(optionchild, optionchildindex) in option.children"
            :key="`${optionchild}-${optionchildindex}`"
            @click="select(optionchild.value)"
            class="
            px-8 
            py-2 
            cursor-pointer 
            hover:bg-gray-100
            select-none
            "
            :class="[
              optionchild.value === modelValue ? 'font-bold' : 'font-regular'
            ]"
          >
            {{ optionchild.label }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { defineComponent, computed, reactive, ref, onMounted, onBeforeUnmount, watch } from "vue"

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
    modelValue: String,
    filterable: {
      type: Boolean,
      default: true
    }
  },
  emites: ['update:modelValue'],
  setup(props, { emit }) {

    const el = ref(null);

    const state = reactive({
      show: false,
      search: null
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

    const normalize = (input) => {
      return typeof input === 'string' ? input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : null;
    }

    const prepareOption = (option => {
      
      if (typeof option.value === 'function') {
        option.value = option.value();
      }
      
      if (typeof option.label === 'function') {
        option.label = option.label();
      }

      if (option.children) {
        option.children = option.children.map(prepareOption);
      }

      return option;
    });

    const options = computed(() => {
      return props.options.map(prepareOption).filter(option => {
        return state.search ? normalize(option.label).includes(normalize(state.search)) : true;
      });
    });

    const selected = computed(() => {
      let result = null;
      options.value.forEach(option => {
        if (option.value === props.modelValue) {
          result = option;
        }
        if (option.children) {
          option.children.forEach(childoption => {
            if (childoption.value === props.modelValue) {
              result = childoption;
            }
          })
        }
      });
      return result;
    });

    const modelLabel = computed(() => {
      return selected.value ? selected.value.label : null;
    });

    const shownValue = computed(() => {
      return props.modelValue ?? props.placeholder;
    });

    const select = (value) => {
      state.search = modelLabel;
      emit('update:modelValue', value);
      hideOptions();
    }

    return {
      options,
      select,
      state,
      showOptions,
      hideOptions,
      toggleOptions,
      modelLabel,
      shownValue,
      ref,
      el
    }
  }
});
</script>
