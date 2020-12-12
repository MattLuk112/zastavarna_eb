<template>
  <div>
    <table class="w-full">
        <thead>
            <th class="border-b px-2 py-2"></th>
            <th class="text-left border-b px-2 py-2">Zástava</th>
            <th class="text-left border-b px-2 py-2">Jméno</th>
            <th class="text-left border-b px-2 py-2">Příjmení</th>
            <th class="text-left border-b px-2 py-2">Splatnost</th>
            <th class="text-left border-b px-2 py-2">Celkem</th>
        </thead>
        <tbody>
            <tr
                v-for="contract in contracts"
                class="group"
                :key="contract._id">
                <td class="px-2 py-2 border-b px-2 py-2 text-sm bg-gray-100 group-hover:bg-gray-100 text-center group-hover:bg-gray-200">
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
                </td>
                <td class="px-2 py-2 border-b px-2 py-2 text-sm group-hover:bg-gray-100">
                    {{ contract.itemName }}
                </td>
                <td class="px-2 py-2 border-b px-2 py-2 text-sm group-hover:bg-gray-100">
                    {{ contract.client.firstName }}
                </td>
                <td class="px-2 py-2 border-b px-2 py-2 text-sm group-hover:bg-gray-100">
                    {{ contract.client.lastName }} 
                </td>
                <td class="px-2 py-2 border-b px-2 py-2 text-sm group-hover:bg-gray-100">
                    {{ formatDate(contract.payDate) }}
                </td>
                <td class="px-2 py-2 border-b px-2 py-2 text-sm group-hover:bg-gray-100">
                    {{ contract.totalPrice }} Kč
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>
<script>
import { doQuery } from '/~composables/graphql';
import { inject, computed } from 'vue';

export default {
  async setup() {
    const contractStore = inject('contractStore');
    const clientStore = inject('clientStore');
    await clientStore.getClients();
    const contractsOrig = await contractStore.getContracts();

    contractsOrig.sort((a, b) => {
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

    function normalize(input) {
      return input.toLowerCase();
    }

    const contracts = computed(() => {
      return contractsOrig.filter(item => {
        function matchesClientSearch(contract, search) {
          return contract.client && (
            normalize(contract.client.firstName).indexOf(search) !== -1
            || normalize(contract.client.lastName).indexOf(search) !== -1
            || normalize(`${contract.client.lastName} ${contract.client.firstName}`).indexOf(search) !== -1
            || normalize(`${contract.client.firstName} ${contract.client.lastName}`).indexOf(search) !== -1
            || normalize(contract.client.birthNumber).indexOf(search) !== -1
          )
        }
        function matchesContractSearch(contract, search) {
          return normalize(contract.itemName).indexOf(search) !== -1
        }
        return matchesClientSearch(item, normalize(contractStore.state.search)) || matchesContractSearch(item, normalize(contractStore.state.search));
      });
    });

    return {
      contracts,
      formatDate,
      contractState,
    };
  },
};
</script>
