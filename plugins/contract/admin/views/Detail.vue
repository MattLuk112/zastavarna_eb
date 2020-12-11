<template>
  <page-layout>
    <template v-slot:header>
      <page-header>
        <template v-slot:title>
          <h2 class="font-semibold">{{ pageTitle }}</h2>
        </template>
        <template v-slot:actions>
          <contract-create-actions
            v-if="isNew"
            @save="save"
          ></contract-create-actions>
          <contract-edit-actions
            v-else
            @save="save"
            @delete="deleteContract"
          ></contract-edit-actions>
        </template>
      </page-header>
    </template>
    <template v-slot:main>
      <Suspense>
        <template #default>
          <contract-form ref="form"></contract-form>
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
import ContractForm from './../components/ContractForm.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    PageLayout,
    PageHeader,
    ContractCreateActions,
    ContractEditActions,
    ContractForm,
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
