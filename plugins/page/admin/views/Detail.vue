<template>
  <page-layout>
    <template v-slot:header>
      <page-header>
        <template v-slot:title>
          <h2 class="font-semibold">{{ pageTitle }}</h2>
        </template>
        <template v-slot:actions>
          <page-create-actions v-if="isNew" @save="save"></page-create-actions>
        </template>
      </page-header>
    </template>
    <template v-slot:main>
      <Suspense>
        <template #default>
          <page-form ref="formPage"></page-form>
        </template>
        <template #fallback></template>
      </Suspense>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '/~plugins/admin_ui/admin/theme/layouts/PageLayout.vue';
import PageHeader from '/~plugins/admin_ui/admin/theme/components/PageHeader.vue';
import PageCreateActions from './../components/PageCreateActions.vue';
import PageForm from './../components/PageForm.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    PageLayout,
    PageHeader,
    PageCreateActions,
    PageForm
  },
  setup() {
    const formPage = ref(null);
    const route = useRoute();
    const id = route.params.id;
    let isNew = true;
    let pageTitle = 'Nová stranka';
    if (id) {
      isNew = false;
      pageTitle = `Detail stranky ${id}`;
    }

    function save() {
      formPage.value.save();
    }

    return {
      isNew,
      pageTitle,
      formPage,
      save
    };
  },
};
</script>
