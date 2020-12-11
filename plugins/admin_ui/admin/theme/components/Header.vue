<template>
  <div
    class="fixed inset-x-0 top-0 flex items-center h-16 bg-white border-b border-gray-200 z-100"
  >
    <div class="relative w-full max-w-screen-xl px-6 mx-auto">
      <div class="flex items-center -mx-6">
        <div class="pl-6 pr-6 lg:w-1/4 xl:w-1/5 lg:pr-8">
          <div class="flex items-center">
            <h1 class="font-semibold">
              <router-link :to="{ name: 'AdminIndex' }" class="block lg:mr-4">
                Zastavárna
              </router-link>
            </h1>
          </div>
        </div>
        <div class="flex flex-grow min-w-0 lg:w-3/4 xl:w-4/5">
          <div class="w-full min-w-0 lg:px-6 xl:w-3/4 xl:px-12">
            <div class="relative">
              <button
                class="block w-full py-2 pl-10 pr-4 leading-normal text-left text-gray-600 truncate transition-colors duration-100 ease-in-out bg-gray-200 border border-transparent rounded-lg appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-300"
              >
                Vyhledat
                <span class="hidden sm:inline">(jméno, zástava nebo RČ)</span>
              </button>
              <div
                class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none"
              >
                <svg
                  class="w-4 h-4 text-gray-600 pointer-events-none fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div class="relative w-full min-w-0 text-right xl:w-1/4">
            <button
              class="inline-block transition duration-150 ease-in-out border-2 border-transparent rounded-full focus:outline-none focus:border-white"
              aria-label="User menu"
              aria-haspopup="true"
              @click="toggleDropdown"
            >
              <img
                class="w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Jmeno Uzivatele"
              />
            </button>
            <div
              class="absolute right-0 transform bg-white border rounded shadow-lg translate-x-1/4"
              :class="!userDropdown ? 'hidden' : ''"
            >
              <div
                class="px-10 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
                @click="logout"
              >
                Logout
              </div>
            </div>
          </div>
          <button
            type="button"
            id="sidebar-open"
            class="flex items-center px-6 text-gray-500 lg:hidden focus:outline-none focus:text-gray-700"
            aria-label="Otevrit navigaci"
          >
            <svg
              class="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
          <button
            type="button"
            id="sidebar-close"
            class="flex items-center hidden px-6 text-gray-500 lg:hidden focus:outline-none focus:text-gray-700"
            aria-label="Zavrit navigaci"
          >
            <svg
              class="w-4 h-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    let userDropdown = ref(false);

    function toggleDropdown() {
      userDropdown.value = !userDropdown.value;
    }

    function logout() {
      localStorage.removeItem('jwt');
      location = '/login';
    }

    return {
      userDropdown,
      toggleDropdown,
      logout,
    };
  },
};
</script>
