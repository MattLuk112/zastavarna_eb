<template>
  <div
    class="max-w-3xl px-6 py-6 mx-auto border-b lg:ml-0 lg:mr-auto xl:mx-0 xl:px-12"
    v-for="rate in rates"
    :key="rate.name"
  >
    <div class="justify-between lg:flex">
      <div>
        <p class="text-xs text-gray-400 uppercase">Název</p>
        <div class="text-lg font-semibold">{{ rate.name }}</div>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase">% z ceny</p>
        <div class="text-lg font-semibold">{{ rate.percentageFromPrice }}%</div>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase">Sazba</p>
        <div class="text-lg font-semibold">{{ rate.amount }}%</div>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase">Za</p>
        <div class="text-lg font-semibold">{{ rate.days }} den</div>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase">Max doba</p>
        <div class="text-lg font-semibold">{{ rate.maxDays }} dnů</div>
      </div>
      <div>
        <p class="text-xs text-gray-400 uppercase">Max částka</p>
        <div class="text-lg font-semibold">{{ rate.maxPrice }} Kč</div>
      </div>
      <router-link
        :to="{ name: 'RateDetail', params: { id: rate._id } }"
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
    const rateStore = inject('rateStore');
    const rates = await rateStore.getRates();

    return {
      rates,
    };
  },
};
</script>
