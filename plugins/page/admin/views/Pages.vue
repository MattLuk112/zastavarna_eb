<template>
  <page-layout>
    <template v-slot:header>
      <page-header>
        <template v-slot:title>
          <h2 class="font-semibold">Pages</h2>
        </template>
        <template v-slot:actions>
          <page-list-actions></page-list-actions>
        </template>
      </page-header>
    </template>
    <template v-slot:main>
      <Suspense>
        <template #default>
          <page-list></page-list>
        </template>
        <template #fallback> </template>
      </Suspense>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '/~plugins/admin_ui/admin/theme/layouts/PageLayout.vue';
import PageHeader from '/~plugins/admin_ui/admin/theme/components/PageHeader.vue';
import PageList from '../components/PageList.vue';
import PageListActions from '../components/PageListActions.vue';

export default {
  components: {
    PageLayout,
    PageHeader,
    PageList,
    PageListActions
  },
};
</script>
