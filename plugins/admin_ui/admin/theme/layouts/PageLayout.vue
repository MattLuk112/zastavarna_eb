<template>
  <slot name="header">
    <page-header></page-header>
  </slot>
  <slot name="main">
    Content here
  </slot>
</template>
<script>
import PageHeader from './../components/PageHeader.vue';

export default {
  components: { PageHeader },
};
</script>
