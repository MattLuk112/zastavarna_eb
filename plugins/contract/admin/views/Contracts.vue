<template>
  <page-layout>
    <template v-slot:header>
      <page-header>
        <template v-slot:title>
          <h2 class="font-semibold">Smlouvy</h2>
        </template>
        <template v-slot:actions>
          <contract-list-actions></contract-list-actions>
        </template>
      </page-header>
    </template>
    <template v-slot:main>
      <Suspense>
        <template #default>
          <contract-list></contract-list>
        </template>
        <template #fallback>
          Fallback
        </template>
      </Suspense>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '/~plugins/admin_ui/admin/theme/layouts/PageLayout.vue';
import PageHeader from '/~plugins/admin_ui/admin/theme/components/PageHeader.vue';
import ContractListActions from '../components/ContractListActions.vue';
import ContractList from '../components/ContractList.vue';

export default {
  components: {
    PageLayout,
    PageHeader,
    ContractListActions,
    ContractList,
  },
};
</script>
