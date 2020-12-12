<template>
  <page-layout>
    <template v-slot:header>
      <page-header>
        <template v-slot:title>
          <h2 class="font-semibold">{{ pageTitle }}</h2>
        </template>
        <template v-slot:actions>
            <router-link
                 class="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-400 rounded-md group hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:border-gray-500 hover:border-gray-500"
                :to="{ name: 'Contracts' }">
                Zpět
            </router-link>
          <button type="button" onclick="window.print()" class="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-green-100 bg-blue-600 border border-blue-400 rounded-md shadow-sm group hover:text-white focus:outline-none focus:text-white focus:border-blue-500 hover:border-blue-500">
              Tisk
          </button>
        </template>
      </page-header>
    </template>
    <template v-slot:main>
      <Suspense>
        <template #default>
          <contract-preview ref="form"></contract-preview>
        </template>
        <template #fallback> </template>
      </Suspense>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '/~plugins/admin_ui/admin/theme/layouts/PageLayout.vue';
import PageHeader from '/~plugins/admin_ui/admin/theme/components/PageHeader.vue';
import ContractCreateActions from './../components/ContractCreateActions.vue';
import ContractEditActions from './../components/ContractEditActions.vue';
import ContractPreview from './../components/ContractPreview.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    PageLayout,
    PageHeader,
    ContractCreateActions,
    ContractEditActions,
    ContractPreview,
  },
  setup() {
    const form = ref(null);
    const route = useRoute();
    const id = route.params.id;
    let isNew = true;
    let pageTitle = 'Nová smlouva';
    if (id) {
      isNew = false;
      pageTitle = `Detail smlouvy ${id}`;
    }

    function save() {
      form.value.save();
    }

    function deleteContract() {
      form.value.deleteContract();
    }

    return {
      isNew,
      pageTitle,
      save,
      form,
      deleteContract,
    };
  },
};
</script>
