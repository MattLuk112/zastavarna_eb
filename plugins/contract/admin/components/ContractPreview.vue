<template>
  <div class="max-w-3xl mx-auto lg:ml-0 lg:mr-auto">
    <div class="flex flex-wrap px-6 py-6 border-b xl:mx-0 xl:px-12">
        <div class="text-gray-700">
            <div>
                <span class="text-black font-semibold">Zástavní věřitel: Název zastavárny</span><br>
                IČO 627 00 156 DIČ CZ152552155<br>
                ZASTAVÁRNA, Seifertova 18/4, 41801 Bílina<br>
                Telefon: (+420) 777 225 358<br>
                Provozní doba: Po-Pá 10 - 17hod.
            </div>

            <div class="mt-2">
                <span class="text-black font-semibold">a zástavce: {{ localContract.client.firstName }} {{ localContract.client.lastName }}</span><br>
                {{ localContract.client.street }}, {{ localContract.client.city }}, č. OP {{ localContract.client.idCard }}<br>
                Rodné číslo: {{ localContract.client.birthNumber }}
            </div>

            <div class=" mt-5">
                uzavírají zástavní smlouvu o zřízení zástavního práva k věci movité:<br>
                Předmět zástavy: <span class="text-black font-semibold">{{ localContract.itemName }}</span>
            </div>

            <div class=" mt-5">
                <table>
                    <tr>
                        <th class="font-normal text-left pr-2">Jenž má dohodnutou zástavní cenu ve výši:</th>
                        <td>{{ formatPrice(localContract.itemPrice) }} Kč</td>
                    </tr>
                    <tr class="text-black">
                        <th class="font-normal text-left pr-2">Půjčená částka:</th>
                        <td>{{ formatPrice(localContract.loanAmount) }} Kč</td>
                    </tr>
                    <tr>
                        <th class="font-normal text-left pr-2">Denní úroková sazba:</th>
                        <td>{{ formatPrice(localContract.dayInterest) }} Kč</td>
                    </tr>
                    <tr class="text-black">
                        <th class="font-normal text-left pr-2">Půjčená částka včetně zástavního práva celkem:</th>
                        <td>{{ formatPrice(localContract.totalPrice) }} Kč</td>
                    </tr>
                </table>
            </div>

            <div class=" mt-5">
                <table>
                    <tr>
                        <th class="font-normal text-left pr-2">Splatnou dne:</th>
                        <td>{{ formatDateLocale(localContract.payDate) }}</td>
                    </tr>
                </table>
            </div>

            <div class=" mt-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel est in magna vestibulum commodo. Pellentesque ligula est, cursus eget augue ac, rhoncus congue quam. Proin ac condimentum lorem. Integer id pellentesque massa. Ut posuere nisl id nibh suscipit, sit amet sodales turpis maximus. Nam vitae faucibus ligula, et blandit lorem. Fusce tincidunt urna enim, et semper est egestas sed. Pellentesque convallis condimentum lobortis.
            </div>

            <div class=" mt-5">
                V Bílině dne: {{ formatDateLocale(localContract.payDate) }}
            </div>

            <div class="flex mt-10 pt-10 space-x-10">
                <div class="flex-auto w-1/2 text-center border-t-2 border-dashed border-gray-300 pt-4 ">

                    Zástavce (zákazník)
                </div>
                <div class="flex-auto w-1/2 text-center border-t-2 border-dashed border-gray-300 pt-4 ">

                    Zástavní věřitel
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { doQuery, doMutation } from '/~composables/graphql';
import { normalizeString } from '/~composables/string';
import { useRoute, useRouter } from 'vue-router';
import { inject, computed, ref, reactive } from 'vue';
import moment from 'moment';

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

    function formatDateLocale(date) {
        return moment(date).format('l');
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
        if (!id) {
          localContract.payDate = `${year}-${month}-${day}`;
        }
        localContract.rate = result._id;
      }
      return result;
    });

    const calculatedInterest = computed(() => {
      let result = '';
      if (calculatedRate.value) {
        let d;
        if (id) {
          d = new Date(localContract.createdAt).getTime();
        } else {
          d = new Date().getTime();
        }
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

    const formatPrice = (input) => {
      return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
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
      formatDateLocale,
      formatPrice
    };
  },
};
</script>
