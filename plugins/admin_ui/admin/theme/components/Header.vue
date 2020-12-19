<template>
  <div
    class="fixed inset-x-0 top-0 flex items-center h-16 bg-white border-b border-gray-200 z-100 print:hidden"
  >
    <div class="relative w-full max-w-screen-xl px-6 mx-auto">
      <div class="flex items-center -mx-6">
        <div class="pl-6 pr-6 lg:w-1/4 xl:w-1/5 lg:pr-8">
          <div class="flex items-center">
            <div class="flex-grow-0">
              <div class="mr-3 rounded-md bg-gradient-to-br from-pink-500 to-red-500"><svg class="h-6 w-6" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M9 6C10.0929 6 11.1175 6.29218 12 6.80269V16.8027C11.1175 16.2922 10.0929 16 9 16C7.90714 16 6.88252 16.2922 6 16.8027V6.80269C6.88252 6.29218 7.90714 6 9 6Z" fill="#FFF1F2"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M15 6C16.0929 6 17.1175 6.29218 18 6.80269V16.8027C17.1175 16.2922 16.0929 16 15 16C13.9071 16 12.8825 16.2922 12 16.8027V6.80269C12.8825 6.29218 13.9071 6 15 6Z" fill="#FECDD3"></path></svg></div>
            </div>
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
              <input
                class="block w-full py-2 pl-10 pr-4 leading-normal text-left text-gray-600 placeholder-gray-400 truncate transition-colors duration-100 ease-in-out bg-gray-100 border rounded appearance-none select-none focus:outline-none focus:bg-white focus:border-gray-300"
                placeholder="Vyhledat (jméno, zástava nebo RČ)"
                v-model="ui.search"
              >
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
          <div class="relative w-full min-w-0 text-right xl:w-1/4 flex items-center justify-end">

            <base-dropdown
              align="right"
            >
              <img
                class="w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Jmeno Uzivatele"
              />

              <template v-slot:content>
                <div class="py-1 px-4">
                  <div
                    class="bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 cursor-pointer -mx-4 px-3 py-1 text-sm"
                    @click="logout"
                  >
                    Log out
                  </div>
                </div>
              </template>
            </base-dropdown>

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
import { reactive, watch, inject } from 'vue';

export default {
  setup() {
    function logout() {
      localStorage.removeItem('jwt');
      location = '/login';
    }

    const contractStore = inject('contractStore');

    const ui = reactive({
      search: ''
    });

    watch(() => ui.search, (value) => {
      contractStore.setSearch(value);
    })

    return {
      logout,
      ui,
    };
  },
};
</script>
