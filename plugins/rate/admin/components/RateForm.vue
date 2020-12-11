<template>
  <div class="max-w-3xl mx-auto lg:ml-0 lg:mr-auto">
    <div class="flex flex-wrap px-6 py-6 border-b xl:mx-0 xl:px-12">
      <div class="w-1/4 pr-2">
        <label for="" class="block mb-2 font-semibold text-md">Název</label>
        <input
          v-model="localRate.name"
          type="text"
          class="block w-full px-1 py-2 border rounded"
        />
      </div>
      <div class="w-1/4 px-2">
        <label for="" class="block mb-2 font-semibold text-md">% z ceny</label>
        <input
          v-model="localRate.percentageFromPrice"
          type="number"
          class="block w-full px-1 py-2 border rounded"
        />
      </div>
      <div class="w-1/4 px-2">
        <label for="" class="block mb-2 font-semibold text-md">Sazba (%)</label>
        <input
          v-model="localRate.amount"
          type="number"
          class="block w-full px-1 py-2 border rounded"
        />
      </div>
      <div class="w-1/4 pl-2">
        <label for="" class="block mb-2 font-semibold text-md">Za (dny)</label>
        <input
          v-model="localRate.days"
          type="number"
          class="block w-full px-1 py-2 border rounded"
        />
      </div>
      <div class="w-1/3 pr-2 mt-6">
        <label for="" class="block mb-2 font-semibold text-md"
          >Maximální cena</label
        >
        <input
          v-model="localRate.maxPrice"
          type="number"
          class="block w-full px-1 py-2 border rounded"
        />
      </div>
      <div class="w-1/3 px-2 mt-6">
        <label for="" class="block mb-2 font-semibold text-md"
          >Maximální počet dnů</label
        >
        <input
          v-model="localRate.maxDays"
          type="number"
          class="block w-full px-1 py-2 border rounded"
        />
      </div>
      <div class="w-1/3 pl-2 mt-6">
        <label for="" class="block mb-2 font-semibold text-md"
          >Poplatek za ztrátu dokladu</label
        >
        <input
          v-model="localRate.fineForLost"
          type="number"
          class="block w-full px-1 py-2 border rounded"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { inject, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  async setup() {
    const rateStore = inject('rateStore');
    let isNew = true;
    const route = useRoute();
    const id = route.params.id;
    const router = useRouter();

    let localRate = reactive({
      name: '',
      percentageFromPrice: 0,
      amount: 1,
      days: 1,
      maxPrice: 0,
      maxDays: 0,
      fineForLost: 0,
    });

    if (id) {
      isNew = false;
      localRate = reactive(await rateStore.getRate(id));
    }

    async function save() {
      if (id) {
        await rateStore.updateRate(localRate);
      } else {
        await rateStore.createRate(localRate);
      }
      router.push({ name: 'Rates' });
    }

    async function deleteRate() {
      if (id) {
        await rateStore.deleteRate(id);
        router.push({ name: 'Rates' });
      }
    }

    return {
      localRate,
      save,
      deleteRate,
    };
  },
};
</script>
