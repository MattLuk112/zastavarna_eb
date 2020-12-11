<template>
  <page-layout>
    <template v-slot:header>
      <page-header>
        <template v-slot:title>
          <h2 class="font-semibold">{{ pageTitle }}</h2>
        </template>
        <template v-slot:actions>
          <rate-create-actions v-if="isNew" @save="save"></rate-create-actions>
          <rate-edit-actions
            v-else
            @save="save"
            @delete="deleteRate"
          ></rate-edit-actions>
        </template>
      </page-header>
    </template>
    <template v-slot:main>
      <Suspense>
        <template #default>
          <rate-form ref="rateForm"></rate-form>
        </template>
        <template #fallback></template>
      </Suspense>
    </template>
  </page-layout>
</template>
<script>
import PageLayout from '/~plugins/admin_ui/admin/theme/layouts/PageLayout.vue';
import PageHeader from '/~plugins/admin_ui/admin/theme/components/PageHeader.vue';
import RateCreateActions from './../components/RateCreateActions.vue';
import RateEditActions from './../components/RateEditActions.vue';
import RateForm from './../components/RateForm.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

export default {
  components: {
    PageLayout,
    PageHeader,
    RateCreateActions,
    RateEditActions,
    RateForm,
  },
  setup() {
    const rateForm = ref(null);
    const route = useRoute();
    const id = route.params.id;
    let isNew = true;
    let pageTitle = 'Nová sazba';
    if (id) {
      isNew = false;
      pageTitle = `Detail sazby ${id}`;
    }

    function save() {
      rateForm.value.save();
    }

    function deleteRate() {
      rateForm.value.deleteRate();
    }

    return {
      isNew,
      pageTitle,
      save,
      rateForm,
      deleteRate,
    };
  },
};
</script>
