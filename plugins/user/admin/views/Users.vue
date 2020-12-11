<template>
  <page-layout>
    <template v-slot:main>
      <Suspense>
        <template #default>
          <users-list></users-list>
        </template>
        <template #fallback></template>
      </Suspense>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '/~plugins/admin_ui/admin/theme/layouts/PageLayout.vue';
import UsersList from './../components/UsersList.vue';
import { doQuery } from '/~composables/graphql';

export default {
  components: {
    PageLayout,
    UsersList,
  },
};
</script>
