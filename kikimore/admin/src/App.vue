<template>
  <router-view></router-view>
</template>
<script>
import { provides } from 'stores-loader-admin';

export default {
  provide: provides,
};
</script>
