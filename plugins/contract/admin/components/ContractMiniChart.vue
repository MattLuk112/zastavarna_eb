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

        TEST NECO

        <div class="flex items-end pt-2 space-x-1">
          <div v-for="period in stats.lastPeriod"
            :key="period.label"
            class="w-2 bg-gray-500"
            :class="[`h-${period.height}`]">
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
        const start = now.clone().subtract(14, 'days');
        const period = [];

        for (let m = start; m.isBefore(now); m.add(14, 'days')) {
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

    return {
      contracts,
      stats
    };
  },
};
</script>
