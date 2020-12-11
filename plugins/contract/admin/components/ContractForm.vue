<template>
  <div class="max-w-3xl mx-auto lg:ml-0 lg:mr-auto">
    <div class="relative px-6 py-6 border-b xl:mx-0 xl:px-12" v-if="isNew">
      <input
        type="text"
        class="block w-full px-1 py-2 placeholder-gray-600 bg-gray-200 border rounded focus:outline-none focus:bg-white focus:text-black"
        placeholder="Hledat podle Jména/RČ/Čísla OP"
        @blur="hideSearch"
        v-model="searchClient"
      />
      <div
        class="absolute left-0 right-0 mx-6 bg-white border border-t-0 rounded shadow-md"
        v-if="searchClient.length"
      >
        <div
          v-for="single in searchResult"
          class="px-2 py-4 border-b cursor-pointer hover:bg-gray-100 hover:text-gray-600"
          @click="fillClient(single)"
        >
          {{ single.firstName }} {{ single.lastName }}, RČ:
          {{ single.birthNumber }}, OP: {{ single.idCard }}
        </div>
        <div
          v-if="!searchResult.length"
          class="px-2 py-4 italic text-center border-b cursor-pointer"
        >
          žádný výsledek
        </div>
      </div>
    </div>
    <div class="flex flex-wrap px-6 py-6 border-b xl:mx-0 xl:px-12">
      <div
        class="flex justify-between w-full mb-6 text-2xl font-bold uppercase align-center"
      >
        <h3>Klient</h3>
        <div class="flex space-x-3 text-gray-300">
          <div
            class="cursor-pointer hover:text-gray-900"
            :class="{ 'text-gray-900': localContract.client.sex == 'female' }"
            @click="localContract.client.sex = 'female'"
          >
            &#9792;
          </div>
          <div
            class="cursor-pointer hover:text-gray-900"
            :class="{ 'text-gray-900': localContract.client.sex == 'male' }"
            @click="localContract.client.sex = 'male'"
          >
            &#9794;
          </div>
        </div>
      </div>
      <div class="w-1/2 pr-2">
        <label for="" class="block mb-2 font-semibold text-md">Jméno</label>
        <input
          class="block w-full px-1 py-2 border rounded"
          type="text"
          v-model="localContract.client.firstName"
        />
      </div>
      <div class="w-1/2 pl-2">
        <label for="" class="block mb-2 font-semibold text-md">Příjmení</label>
        <input
          class="block w-full px-1 py-2 border rounded"
          type="text"
          v-model="localContract.client.lastName"
        />
      </div>
      <div class="w-1/2 pr-2 mt-6">
        <label for="" class="block mb-2 font-semibold text-md">Ulice</label>
        <input
          class="block w-full px-1 py-2 border rounded"
          type="text"
          v-model="localContract.client.street"
        />
      </div>
      <div class="w-1/2 pl-2 mt-6">
        <label for="" class="block mb-2 font-semibold text-md">Město</label>
        <input
          class="block w-full px-1 py-2 border rounded"
          type="text"
          v-model="localContract.client.city"
        />
      </div>
      <div class="w-1/3 pr-2 mt-6">
        <label for="" class="block mb-2 font-semibold text-md">OP</label>
        <input
          class="block w-full px-1 py-2 border rounded"
          type="text"
          v-model="localContract.client.idCard"
        />
      </div>
      <div class="w-1/3 px-2 mt-6">
        <label for="" class="block mb-2 font-semibold text-md">RČ</label>
        <input
          class="block w-full px-1 py-2 border rounded"
          type="text"
          v-model="localContract.client.birthNumber"
        />
      </div>
      <div class="w-1/3 pl-2 mt-6">
        <label for="" class="block mb-2 font-semibold text-md"
          >Státní příslušnost</label
        >
        <input
          class="block w-full px-1 py-2 border rounded"
          type="text"
          v-model="localContract.client.nationality"
        />
      </div>
    </div>
    <div class="px-6 pt-6 xl:mx-0 xl:px-12">
      <div
        class="flex items-center justify-between w-full mb-6 text-2xl font-bold uppercase"
      >
        <h2 class="">Zástava</h2>
        <div class="" v-if="calculatedRate">{{ calculatedRate.name }}</div>
        <div class="text-xs text-gray-200" v-else>SAZBA</div>
      </div>
      <label for="" class="block mb-2 font-semibold text-md">Popis</label>
      <input
        class="block w-full px-1 py-2 border rounded"
        type="text"
        v-model="localContract.itemName"
      />
    </div>
    <div class="flex px-6 pt-6 xl:mx-0 xl:px-12">
      <div class="w-2/5 pr-2">
        <label for="" class="block mb-2 font-semibold text-md"
          >Zástavní cena</label
        >
        <input
          class="block w-full px-1 py-2 border rounded"
          type="number"
          v-model="localContract.itemPrice"
        />
      </div>
      <div class="flex w-3/5 pl-2">
        <div class="w-1/2">
          <label for="" class="block mb-2 font-semibold text-md">Půjčeno</label>
          <input
            class="block w-full px-1 py-2 border rounded"
            type="number"
            v-model="localContract.loanAmount"
          />
        </div>
        <div class="flex flex-wrap justify-around w-1/2">
          <label
            for=""
            class="block w-full mb-2 font-semibold opacity-0 text-md"
            >Sazba</label
          >
          <span>+</span>
          <span class="font-bold" v-if="calculatedRate"
            >{{ calculatedRate.amount }} %</span
          >
          <span class="font-bold" v-else>??? %</span>
          <span>za</span>
          <span class="font-bold" v-if="calculatedRate"
            >{{ calculatedRate.days }} dny</span
          >
          <span class="font-bold" v-else>? dny</span>
        </div>
      </div>
    </div>
    <div class="flex px-6 pt-6 xl:mx-0 xl:px-12">
      <div class="w-1/2 pr-2">
        <label for="" class="block mb-2 font-semibold text-md"
          >Úhrada s přísl.</label
        >
        <div class="w-full px-1 py-2 border-b-2 border-gray-600">
          <span v-if="calculatedInterest"
            >{{ localContract.loanAmount }} + {{ calculatedInterest }} =
            {{
              parseInt(localContract.loanAmount) + parseInt(calculatedInterest)
            }}</span
          >
        </div>
      </div>
      <div class="w-1/2 pl-2">
        <label for="" class="block mb-2 font-semibold text-md">Splatno</label>
        <input
          class="block w-full px-1 py-2 border rounded"
          type="date"
          :min="formatDate()"
          v-model="localContract.payDate"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { doQuery, doMutation } from '/~composables/graphql';
import { normalizeString } from '/~composables/string';
import { useRoute, useRouter } from 'vue-router';
import { inject, computed, ref, reactive } from 'vue';

export default {
  async setup() {
    const contractStore = inject('contractStore');
    const clientStore = inject('clientStore');
    const rateStore = inject('rateStore');
    const searchClient = ref('');
    let isNew = true;
    let clients;
    const route = useRoute();
    const id = route.params.id;
    const router = useRouter();
    let localContract = reactive({
      client: {
        _id: '',
        firstName: '',
        lastName: '',
        street: '',
        city: '',
        idCard: '',
        birthNumber: '',
        nationality: '',
        sex: '',
      },
      itemName: '',
      itemPrice: 0,
      loanAmount: 0,
      payDate: '',
      rate: '',
      totalInterest: 0,
      dayInterest: 0,
      totalPrice: 0,
    });

    if (id) {
      isNew = false;
      localContract = reactive(await contractStore.getContract(id));
    } else {
      clients = await clientStore.getClients();
    }

    const rates = await rateStore.getRates();

    function formatDate(date) {
      let d;
      if (date) {
        d = new Date(date);
      } else {
        d = new Date();
        d.setDate(d.getDate() + 1);
      }
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }

    async function save() {
      let mutation;
      if (id) {
        /* mutation = `
          updateContract(contract: {
            _id: "${id}",
            firstName: "${localContract.firstName}",
            lastName: "${localContract.lastName}",
            itemName: "${localContract.itemName}",
            itemPrice: ${localContract.itemPrice},
          }) {
          firstName,
          }
        `; */
      } else {
        await contractStore.createContract(localContract);
        router.push({ name: 'Contracts' });
      }
    }

    const searchResult = computed(() => {
      const value = searchClient.value.toLowerCase();
      const results = clients.filter((client) => {
        if (normalizeString(client.firstName).toLowerCase().includes(value)) {
          return true;
        }
        if (normalizeString(client.lastName).toLowerCase().includes(value)) {
          return true;
        }
        if (client.birthNumber.includes(value)) {
          return true;
        }
        if (client.idCard.includes(value)) {
          return true;
        }
        return false;
      });
      return value.length ? results : [];
    });

    const calculatedRate = computed(() => {
      let result = '';
      if (localContract.itemPrice) {
        result = rates.find((rate) => {
          return rate.maxPrice > localContract.itemPrice;
        });
      }
      if (result) {
        const percentage = result.percentageFromPrice / 100;
        localContract.loanAmount = localContract.itemPrice * percentage;
        const d = new Date();
        d.setDate(d.getDate() + result.maxDays);
        const year = d.getFullYear();
        const month = `0${d.getMonth() + 1}`.slice(-2);
        const day = `0${d.getDate()}`.slice(-2);
        localContract.payDate = `${year}-${month}-${day}`;
        localContract.rate = result._id;
      }
      return result;
    });

    const calculatedInterest = computed(() => {
      let result = '';
      if (calculatedRate.value) {
        const d = new Date().getTime();
        const payDate = new Date(localContract.payDate).getTime();
        const differenceInTime = payDate - d;
        const differenceInDays = Math.ceil(
          differenceInTime / (1000 * 3600 * 24),
        );
        const totalDaysToCount = differenceInDays / calculatedRate.value.days;
        const totalPercentage = totalDaysToCount * calculatedRate.value.amount;
        const percentageReverse = totalPercentage / 100;
        const totalInterest = (
          localContract.loanAmount * percentageReverse
        ).toFixed();
        result = totalInterest;

        localContract.totalInterest = totalInterest;
        localContract.totalPrice =
          parseInt(totalInterest) + parseInt(localContract.loanAmount);
        localContract.dayInterest = (totalInterest / totalDaysToCount).toFixed(
          2,
        );
      }
      return result;
    });

    function fillClient(client) {
      localContract.client = client;
    }

    function hideSearch() {
      setTimeout(() => {
        searchClient.value = '';
      }, 100);
    }

    async function deleteContract() {
      if (id) {
        await contractStore.deleteContract(id);
        router.push({
          name: 'Contracts',
        });
      }
    }

    return {
      clients,
      localContract,
      save,
      deleteContract,
      isNew,
      searchClient,
      searchResult,
      fillClient,
      hideSearch,
      rates,
      calculatedRate,
      calculatedInterest,
      formatDate,
    };
  },
};
</script>
