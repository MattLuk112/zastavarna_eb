<template>
  <button
    type="button"
    class="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-green-100 bg-green-600 border border-green-400 rounded-md shadow group hover:text-white focus:outline-none focus:text-white focus:border-green-500 hover:border-green-500 hover:bg-green-500"
    @click="$router.push({ name: 'RateDetail' })"
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
    Nová sazba
  </button>
</template>
<script>
export default {};
</script>
