<template>
  <div
    class="max-w-3xl px-6 py-6 mx-auto border-b lg:ml-0 lg:mr-auto xl:mx-0 xl:px-12"
    v-for="contract in contracts"
  >
    <!-- Contract: Meta info -->
    <div class="lg:flex">
      <div class="w-full lg:w-1/2">
        <h3 class="font-semibold truncate">
          <span
            class="inline-block w-3 h-3 border-2 rounded-full"
            :class="{
              'bg-red-500 border-red-300':
                contractState(contract.payDate) == 'passed',
              'bg-yellow-500 border-yellow-300':
                contractState(contract.payDate) == 'today',
              'bg-green-500 border-green-300':
                contractState(contract.payDate) == 'fine',
            }"
          ></span>
          {{ contract.itemName }}
        </h3>
        <p class="mt-0 text-gray-600 truncate">
          {{ contract.client.lastName }} {{ contract.client.firstName }}
        </p>
      </div>
      <div class="w-full pt-4 lg:pt-0 lg:w-1/2 lg:text-right">
        <h3 class="font-semibold truncate">{{ contract.totalPrice }} Kč</h3>
        <p class="mt-0 text-gray-600 truncate">
          {{ formatDate(contract.payDate) }}
        </p>
      </div>
    </div>

    <!-- Contact: Actions -->
    <div class="flex pt-4">
      <div class="w-full space-x-1">
        <a href="#" class="relative inline-block group">
          <span
            class="absolute top-0 left-0 right-0 hidden h-6 -mt-4 text-xs font-semibold text-center text-white bg-green-500 group-hover:block z-1 rounded-t-md"
          >
            Q
          </span>
          <span
            class="relative inline-flex items-center justify-center px-5 py-2 text-base font-medium leading-6 text-gray-800 transition duration-150 ease-in-out bg-white border border-gray-200 rounded-md shadow hover:text-gray-600 focus:outline-none focus:shadow-outline z-2"
          >
            Prodloužení
          </span>
        </a>
        <a href="#" class="relative inline-block group">
          <span
            class="absolute top-0 left-0 right-0 hidden h-6 -mt-4 text-xs font-semibold text-center text-white bg-green-500 group-hover:block z-1 rounded-t-md"
          >
            W
          </span>
          <span
            class="relative inline-flex items-center justify-center px-5 py-2 text-base font-medium leading-6 text-gray-800 transition duration-150 ease-in-out bg-white border border-gray-200 rounded-md shadow hover:text-gray-600 focus:outline-none focus:shadow-outline z-2"
          >
            Vyplacení
          </span>
        </a>
        <a href="#" class="relative inline-block group">
          <span
            class="absolute top-0 left-0 right-0 hidden h-6 -mt-4 text-xs font-semibold text-center text-white bg-green-500 group-hover:block z-1 rounded-t-md"
          >
            E
          </span>
          <router-link
            :to="{ name: 'ContractDetail', params: { id: contract._id } }"
            class="relative inline-flex items-center justify-center px-5 py-2 text-base font-medium leading-6 text-gray-800 transition duration-150 ease-in-out bg-white border border-gray-200 rounded-md shadow hover:text-gray-600 focus:outline-none focus:shadow-outline z-2"
          >
            Editace
          </router-link>
        </a>
        <a href="#" class="relative inline-block group">
          <span
            class="absolute top-0 left-0 right-0 hidden h-6 -mt-4 text-xs font-semibold text-center text-white bg-green-500 group-hover:block z-1 rounded-t-md"
          >
            R
          </span>
          <span
            class="relative inline-flex items-center justify-center px-5 py-2 text-base font-medium leading-6 text-gray-800 transition duration-150 ease-in-out bg-white border border-gray-200 rounded-md shadow hover:text-gray-600 focus:outline-none focus:shadow-outline z-2"
          >
            Propadnutí
          </span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import { doQuery } from '/~composables/graphql';
import { inject } from 'vue';

export default {
  async setup() {
    const contractStore = inject('contractStore');
    const clientStore = inject('clientStore');
    await clientStore.getClients();
    const contracts = await contractStore.getContracts();

    contracts.sort((a, b) => {
      return new Date(a.payDate) - new Date(b.payDate);
    });

    function formatDate(date) {
      const d = new Date(date);
      return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;
    }

    function contractState(date) {
      const d = new Date(date).setHours(0, 0, 0, 0);
      const td = new Date().setHours(0, 0, 0, 0);

      // Passed
      if (d < td) {
        return 'passed';
      }
      // Today
      if (d == td) {
        return 'today';
      }
      // Fine
      if (d > td) {
        return 'fine';
      }
    }

    return {
      contracts,
      formatDate,
      contractState,
    };
  },
};
</script>
