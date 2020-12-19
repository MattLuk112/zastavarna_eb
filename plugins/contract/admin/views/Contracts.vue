<template>
  <page-layout>
    <template v-slot:header>
      <page-header>
        <template v-slot:title>
          <h2 class="font-semibold">Smlouvy</h2>
        </template>
        <template v-slot:actions>
          <contract-list-actions 
            :options="options"
            @order="order"
          ></contract-list-actions>
        </template>
      </page-header>
    </template>
    <template v-slot:main>
      <Suspense>
        <template #default>
          <contract-list
            :options="options"
          ></contract-list>
        </template>
        <template #fallback>
          Fallback
        </template>
      </Suspense>
    </template>
  </page-layout>
</template>
<script>
import { reactive } from 'vue';
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
  setup() {
    const options = reactive({
      orderBy: 'payDate',
      orderWay: 'ASC'
    })

    const order = (orderBy, orderWay) => {
      options.orderBy = orderBy;
      options.orderWay = orderWay;
    }

    return {
      options,
      order
    }
  }
};
</script>
