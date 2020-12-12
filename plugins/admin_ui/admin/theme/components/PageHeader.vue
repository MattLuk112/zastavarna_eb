<template>
  <!-- Headline -->
  <div
    class="flex items-center justify-between max-w-3xl px-6 py-6 mx-auto border-b lg:ml-0 lg:mr-auto xl:mx-0 xl:px-12 print:hidden"
  >
    <div class="">
      <slot name="title">
        <h2 class="font-semibold">{{ pageTitle }}</h2>
      </slot>
    </div>
    <div class="space-x-1 text-right">
      <slot name="actions">
        <button
          type="button"
          class="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-400 rounded-md group hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:border-gray-500 hover:border-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            class="w-5 h-5 mr-3 -ml-1 text-gray-400 group-focus:text-gray-500"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
            />
          </svg>
          Řazení
        </button>
      </slot>
    </div>
  </div>
</template>
<script>
import { useRoute } from 'vue-router';

export default {
  setup() {
    const route = useRoute();
    const pageTitle =
      typeof route.meta.title !== 'undefined' ? route.meta.title : 'Page';

    return {
      pageTitle,
    };
  },
};
</script>
