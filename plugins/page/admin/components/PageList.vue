<template>
  <div
    class="max-w-3xl px-6 py-6 mx-auto border-b lg:ml-0 lg:mr-auto xl:mx-0 xl:px-12"
    v-for="page in pages"
    :key="page._id"
  >
    <div class="justify-between lg:flex">
      <div>
        <p class="text-xs text-gray-400 uppercase">Titulek</p>
        <div class="text-lg font-semibold">{{ page.title }}</div>
      </div>
      <router-link
        :to="{ name: 'PageDetail', params: { id: page._id } }"
        class="relative inline-flex items-center justify-center px-3 py-2 text-base font-medium leading-6 text-gray-800 transition duration-150 ease-in-out bg-white border border-gray-200 rounded-md shadow cursor-pointer hover:text-gray-600 focus:outline-none focus:shadow-outline z-2"
      >
        Upravit
      </router-link>
    </div>
  </div>
</template>
<script>
import { inject } from 'vue';

export default {
  async setup() {
    const pageStore = inject('pageStore');
    const pages = await pageStore.getPages();

    return {
      pages,
    };
  },
};
</script>
