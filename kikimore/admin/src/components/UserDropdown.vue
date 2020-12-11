<template>
  <div>
    <a
      class="block text-gray-600"
      href="#pablo"
      v-on:click="toggleDropdown($event)"
      ref="btnDropdownRef"
    >
      <div class="flex items-center">
        <span
          class="inline-flex items-center justify-center w-12 h-12 text-sm text-white bg-gray-300 rounded-full"
        >
          <img
            alt="..."
            class="w-full align-middle border-none rounded-full shadow-lg"
            src="../assets/img/team-1-800x800.jpg"
          />
        </span>
      </div>
    </a>
    <div
      ref="popoverDropdownRef"
      class="z-50 float-left py-2 mt-1 text-base text-left list-none bg-white rounded shadow-lg"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
      style="min-width: 12rem"
    >
      <a
        href="#pablo"
        class="block w-full px-4 py-2 text-sm font-normal text-gray-800 whitespace-no-wrap bg-transparent"
      >
        Profile
      </a>
      <div class="h-0 my-2 border border-gray-200 border-solid" />
      <span
        @click="logout"
        class="block w-full px-4 py-2 text-sm font-normal text-gray-800 whitespace-no-wrap bg-transparent"
      >
        Log Out
      </span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dropdownPopoverShow: false,
    };
  },
  methods: {
    toggleDropdown: function (event) {},
    logout() {
      localStorage.removeItem('jwt');
      window.location.replace('/login');
    },
  },
};
</script>
