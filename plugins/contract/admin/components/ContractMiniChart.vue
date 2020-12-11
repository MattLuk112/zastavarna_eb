<template>
    <div>
        <!-- Chart -->
        <div class="flex">
          <div class="w-1/2">
            <h4 class="font-semibold">Stav</h4>
          </div>
          <div class="w-1/2 text-right">
            <span class="font-semibold"> 
              {{ stats.total }} Kč
            </span>
          </div>
        </div>

        {{ stats.highest }} Kč

        {{ stats.lastPeriod }}

        <div class="flex items-end pt-2 space-x-1">
          <div class="w-2 h-4 bg-gray-500"></div>
          <div class="w-2 h-6 bg-gray-500"></div>
          <div class="w-2 h-2 bg-gray-500"></div>
          <div class="w-2 h-8 bg-gray-500"></div>
          <div class="w-2 h-2 bg-gray-500"></div>
          <div class="w-2 h-10 bg-gray-500"></div>
          <div class="w-2 h-8 bg-gray-500"></div>
          <div class="w-2 h-2 bg-gray-500"></div>
          <div class="w-2 h-6 bg-gray-500"></div>
          <div class="w-2 h-5 bg-gray-500"></div>
          <div class="w-2 h-8 bg-gray-500"></div>
          <div class="w-2 h-8 bg-gray-500"></div>
          <div class="w-2 h-2 bg-gray-500"></div>
          <div class="w-2 h-1 bg-gray-500"></div>
          <div class="w-2 h-3 bg-gray-500"></div>
          <div class="w-2 h-5 bg-gray-500"></div>
          <div class="w-2 h-6 bg-gray-500"></div>
          <div class="w-2 h-10 bg-gray-500"></div>
        </div>
    </div>
</template>

<script>
import { inject, reactive, computed } from 'vue';
import moment from 'moment';

export default {
  async setup() {
    const contractStore = inject('contractStore');
    const contracts = contractStore.state.contracts;

    const stats = reactive({
      lastPeriod: computed(() => {
        const now = moment().utc();
        const start = now.clone().subtract(30, 'days');
        const period = [];

        for (let m = start; m.isBefore(now); m.add(1, 'days')) {
          period.push(m.format('YYYY-MM-DD'));
        }

        return period;
      }),
      highest: computed(() => {
        if (contracts.length === 0) {
          return 0;
        }
        return contracts.sort((a, b) => {
          return a.totalPrice < b.totalPrice; 
        }).find(() => true).totalPrice;
      }),
      total: computed(() => {
        return contracts.reduce((accumulator, item) => {
          return accumulator + item.totalPrice;
        }, 0);
      })
    });

    return {
      contracts,
      stats
    };
  },
};
</script>
