<template>
  <!-- Navbar -->
  <nav
    class="absolute top-0 left-0 z-10 items-center hidden w-full p-4 bg-blue-500 md:flex md:flex-row md:flex-no-wrap md:justify-start"
  >
    <div
      class="flex flex-wrap items-center justify-between w-full px-4 mx-auto md:flex-no-wrap md:px-10"
    >
      <!-- Brand -->
      <div class="text-sm font-semibold text-blue-100 uppercase">
        {{ $route.meta.title }}
      </div>
      <!-- Form -->
      <!-- <form
        class="flex-row flex-wrap items-center hidden mr-3 md:flex lg:ml-auto"
      >
        <div class="relative flex flex-wrap items-stretch w-full">
          <span
            class="absolute z-10 items-center justify-center w-8 h-full py-3 pl-3 text-base font-normal leading-snug text-center text-gray-400 bg-transparent rounded"
            ><svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path></svg
          ></span>
          <input
            type="text"
            placeholder="Search here..."
            class="relative w-full px-3 py-3 pl-10 text-sm text-gray-700 placeholder-gray-400 bg-white rounded shadow outline-none focus:outline-none focus:shadow-outline"
          />
        </div>
      </form> -->
      <!-- User -->
      <ul class="flex-col items-center hidden list-none md:flex-row md:flex">
        <user-dropdown-component></user-dropdown-component>
      </ul>
    </div>
  </nav>

  <!-- End Navbar -->
</template>
<script>
import UserDropdownComponent from './UserDropdown.vue';
export default {
  components: {
    UserDropdownComponent,
  },
};
</script>
