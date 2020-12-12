<template>
  <page-layout>
    <template v-slot:header>
      <page-header>
        <template v-slot:title>
          <h2 class="font-semibold">Přehledy</h2>
        </template>
        <template v-slot:actions>
            <div>
                <!-- Nic -->
            </div>
        </template>
      </page-header>
    </template>
    <template v-slot:main>
      <Suspense>
        <template #default>
          <contract-overview></contract-overview>
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
import ContractOverview from '../components/ContractOverview.vue';

export default {
  components: {
    PageLayout,
    PageHeader,
    ContractListActions,
    ContractOverview,
  },
};
</script>
