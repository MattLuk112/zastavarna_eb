<template>
  <button
    type="button"
    class="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-400 rounded-md group hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:border-gray-500 hover:border-gray-500"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      class="w-5 h-5 mr-3 -ml-1 text-gray-400 group-focus:text-gray-500"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
      />
    </svg>
    Řazení
  </button>
  <button
    type="button"
    class="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-green-100 bg-green-600 border border-green-400 rounded-md shadow-xl group hover:text-white focus:outline-none focus:text-white focus:border-green-500 hover:border-green-500"
    @click="$router.push({ name: 'ContractDetail' })"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="w-5 h-5 mr-3 -ml-1 text-green-400 group-focus:text-green-500"
    >
      <path
        fill-rule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clip-rule="evenodd"
      />
    </svg>
    Nová smlouva
  </button>
</template>
