<template>
  <base-dropdown>
    <div
      class="
        relative
        inline-flex 
        items-center 
        px-4 
        py-2 
        text-sm 
        font-medium 
        leading-5 
        text-gray-700 
        bg-white border 
        border-gray-400 
        rounded-md group 
        hover:text-gray-900 
        focus:outline-none 
        focus:text-gray-900 
        focus:border-gray-500 
        hover:border-gray-500
        select-none	
      "
    >
      <icon-sort-descending></icon-sort-descending>
      Řazení
    </div>
    <template v-slot:content>
      <div class="py-1 px-4">
        <div
          class="bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 cursor-pointer -mx-4 px-3 py-1 text-sm"
          @click="$emit('order', 'payDate', 'ASC')"
        >
          Nejbližší splatnost
        </div>
        <div
          class="bg-white hover:bg-gray-100 text-gray-700 hover:text-gray-900 cursor-pointer -mx-4 px-3 py-1 text-sm"
          @click="$emit('order', 'payDate', 'DESC')"
        >
          Nejvzdálenější splatnost
        </div>
      </div>
    </template>
  </base-dropdown>
  <button
    type="button"
    class="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-green-100 bg-green-600 border border-green-400 rounded-md shadow group hover:text-white focus:outline-none focus:text-white focus:border-green-500 hover:border-green-500 hover:bg-green-500"
    @click="$router.push({ name: 'ContractDetail' })"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="w-5 h-5 mr-3 -ml-1"
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

<script>
export default {
  props: {
    options: {
      type: Object,
      default() {
        return {
          orderBy: 'payDate',
          orderWay: 'ASC'
        };
      }
    }
  },
  emits: ['order'],
  setup(props) {
    return {
      options: props.options
    }
  }
}
</script>