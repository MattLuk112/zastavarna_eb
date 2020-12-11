<template>
  <div
    class="max-w-3xl px-6 py-6 mx-auto border-b lg:ml-0 lg:mr-auto xl:mx-0 xl:px-12"
    v-for="user in users"
  >
    {{ user.name }} - {{ user.email }}
  </div>
</template>
<script>
import { doQuery } from '/~composables/graphql';

export default {
  async setup() {
    const {
      data: { users },
      errors,
    } = await doQuery(`users{
                    _id,
                    name,
                    email,
                    role
                  }`);
    return {
      users,
    };
  },
};
</script>
