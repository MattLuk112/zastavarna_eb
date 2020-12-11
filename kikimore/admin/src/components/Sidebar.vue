<template>
  <nav
    class="relative z-10 flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-no-wrap md:overflow-hidden md:w-64"
  >
    <div
      class="flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-no-wrap"
    >
      <!-- Toggler -->
      <button
        class="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
        type="button"
        v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <!-- Brand -->
      <a
        class="inline-block p-4 px-0 mr-0 text-sm font-bold text-left text-gray-700 uppercase whitespace-no-wrap md:block md:pb-2"
        href="javascript:void(0)"
      >
        Kikimore
      </a>
      <!-- User -->
      <ul class="flex flex-wrap items-center list-none md:hidden">
        <li class="relative inline-block">
          <notification-dropdown-component></notification-dropdown-component>
        </li>
        <li class="relative inline-block">
          <user-dropdown-component></user-dropdown-component>
        </li>
      </ul>
      <!-- Collapse -->
      <div
        class="absolute top-0 left-0 right-0 z-40 items-center flex-1 h-auto overflow-x-hidden overflow-y-auto rounded shadow md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none"
        v-bind:class="collapseShow"
      >
        <!-- Collapse header -->
        <div
          class="block pb-4 mb-4 border-b border-gray-300 border-solid md:min-w-full md:hidden"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <a
                class="inline-block p-4 px-0 mr-0 text-sm font-bold text-left text-gray-700 uppercase whitespace-no-wrap md:block md:pb-2"
                href="javascript:void(0)"
              >
                Kikimore
              </a>
            </div>
            <div class="flex justify-end w-6/12">
              <button
                type="button"
                class="px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden"
                v-on:click="toggleCollapseShow('hidden')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <!-- Form -->
        <form class="mt-6 mb-4 md:hidden">
          <div class="pt-0 mb-3">
            <input
              type="text"
              placeholder="Search"
              class="w-full h-12 px-3 py-2 text-base font-normal leading-snug text-gray-700 placeholder-gray-400 bg-white border border-gray-600 border-solid rounded shadow-none outline-none focus:outline-none"
            />
          </div>
        </form>
        <!-- Navigation -->
        <ul class="flex flex-col list-none md:flex-col md:min-w-full">
          <li class="items-center">
            <router-link
              :to="{ path: '/dashboard' }"
              class="flex items-center py-3 text-xs font-bold text-gray-800 uppercase hover:text-blue-600"
              :class="{ 'text-blue-500': $route.fullPath == '/dashboard' }"
            >
              <div class="w-5 h-5 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>Dashboard</div></router-link
            >
          </li>
          <li class="items-center">
            <router-link
              class="flex items-center py-3 text-xs font-bold text-gray-800 uppercase hover:text-blue-600"
              :to="{ path: '/users' }"
              :class="{ 'text-blue-500': $route.fullPath.includes('/users') }"
              ><div class="w-5 h-5 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <div>Users</div></router-link
            >
          </li>
        </ul>
        <!-- Divider -->
        <!-- <hr class="my-4 md:min-w-full" /> -->
        <!-- Heading -->
        <!-- <h6
          class="block pt-1 pb-4 text-xs font-bold text-gray-600 no-underline uppercase md:min-w-full"
        >
          Documentation
        </h6> -->
        <!-- Navigation -->
        <!-- <ul class="flex flex-col list-none md:flex-col md:min-w-full md:mb-4">
          <li class="inline-flex">
            <a
              class="block mb-4 text-sm font-semibold text-gray-800 no-underline hover:text-gray-600"
              href="#/documentation/styles"
              ><i class="mr-2 text-base text-gray-500 fas fa-paint-brush"></i>
              Styles</a
            >
          </li>
        </ul> -->
      </div>
    </div>
  </nav>
</template>
<script>
import NotificationDropdownComponent from './NotificationDropdown.vue';
import UserDropdownComponent from './UserDropdown.vue';
export default {
  data() {
    return {
      collapseShow: 'hidden',
    };
  },
  methods: {
    toggleCollapseShow: function (classes) {
      this.collapseShow = classes;
    },
  },
  components: {
    NotificationDropdownComponent,
    UserDropdownComponent,
  },
};
</script>
