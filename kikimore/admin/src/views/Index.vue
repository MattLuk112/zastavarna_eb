<template>
  <sidebar-component></sidebar-component>
  <div class="relative md:ml-64">
    <navbar-component></navbar-component>
    <router-view></router-view>
  </div>
</template>
<script>
import SidebarComponent from './../components/Sidebar.vue';
import NavbarComponent from './../components/Navbar.vue';

export default {
  components: {
    SidebarComponent,
    NavbarComponent,
  },
};
</script>
