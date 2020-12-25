<template>
  <div>
    <button
      type="button"
      class="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-green-100 bg-green-600 border border-green-400 rounded-md shadow-xl group hover:text-white focus:outline-none focus:text-white focus:border-green-500 hover:border-green-500"
      @click="$emit('save')"
    >
      Vytvořit
    </button>
  </div>
</template>
