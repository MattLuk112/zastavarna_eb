<template>
  <page-layout>
    <template v-slot:header>
      <page-header>
        <template v-slot:title>
          <h2 class="font-semibold">Sazby</h2>
        </template>
        <template v-slot:actions>
          <rate-list-actions></rate-list-actions>
        </template>
      </page-header>
    </template>
    <template v-slot:main>
      <Suspense>
        <template #default>
          <rate-list></rate-list>
        </template>
        <template #fallback> </template>
      </Suspense>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '/~plugins/admin_ui/admin/theme/layouts/PageLayout.vue';
import PageHeader from '/~plugins/admin_ui/admin/theme/components/PageHeader.vue';
import RateListActions from '../components/RateListActions.vue';
import RateList from '../components/RateList.vue';

export default {
  components: {
    PageLayout,
    PageHeader,
    RateListActions,
    RateList,
  },
};
</script>
