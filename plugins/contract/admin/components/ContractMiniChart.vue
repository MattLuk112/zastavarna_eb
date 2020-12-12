<template>
    <div>
        <!-- Chart -->
        <div class="flex items-center">
          <div class="w-1/2">
            <h4 class="font-bold text-xs whitespace-nowrap">Celková hodnota</h4>
          </div>
          <div class="w-1/2 text-right">
            <span class="font-semibold"> 
              {{ formatPrice(stats.total) }} Kč
            </span>
          </div>
        </div>

        <div class="flex items-end py-4 space-x-1">
          <div v-for="period in stats.lastPeriod"
            :key="period.label"
            class="w-2 bg-gray-300 tooltip cursor-pointer hover:bg-gray-900"
            :class="[`h-${period.height}`]">
              <span class="tooltip-text bg-black text-white p-3 -mt-1 lg:-mt-8 rounded text-sm whitespace-nowrap">
                {{ period.label }} - 
                {{ formatPrice(period.value) }} Kč
              </span>
          </div>
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
        const start = now.clone().subtract(21, 'days');
        const period = [];

        for (let m = start; m.isBefore(now); m.add(1, 'days')) {
          const value = contracts.filter(contract => {
            return moment(contract.createdAt).isSame(m, 'day');
          }).reduce((accumulator, item) => {
            return accumulator + item.totalPrice;
          }, 0);

          const share = (value/stats.highest);

          period.push({
            label: m.format('l'),
            value,
            share,
            percent: 100*share,
            height: Math.ceil(10*share) + 1
          });
        }

        return period;
      }),
      highest: computed(() => {
        if (contracts.length === 0) {
          return 0;
        }
        return Math.max.apply(Math, contracts.map(function(o) { return o.totalPrice; }));
      }),
      total: computed(() => {
        return contracts.reduce((accumulator, item) => {
          return accumulator + item.totalPrice;
        }, 0);
      })
    });

    const formatPrice = (input) => {
      return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    return {
      contracts,
      stats,
      formatPrice
    };
  },
};
</script>
