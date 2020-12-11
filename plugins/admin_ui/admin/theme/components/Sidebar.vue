<template>
  <div
    class="fixed inset-0 hidden w-full h-full pt-16 -mb-16 border-b z-90 lg:-mb-0 lg:static lg:h-auto lg:overflow-y-visible lg:border-b-0 lg:pt-0 lg:w-1/4 lg:block lg:border-0 lg:border-r xl:w-1/5"
  >
    <div
      class="h-full overflow-hidden overflow-y-auto scrolling-touch bg-white lg:h-auto lg:block lg:sticky lg:bg-transparent top-4 lg:top-16"
    >
      <!-- Left navigation -->
      <nav
        class="px-6 pt-6 overflow-y-auto text-base font-semibold lg:text-sm lg:py-12 lg:pl-6 lg:pr-8 lg:h-(screen-16)"
      >
        <router-link
          :to="{ name: 'Contracts' }"
          v-slot="{ href, navigate, isActive }"
        >
          <div
            class="block mb-2 hover:text-gray-900"
            :class="isActive ? 'text-gray-900' : 'text-gray-500'"
            :href="href"
            @click="navigate"
          >
            Smlouvy
          </div>
        </router-link>
        <router-link
          :to="{ name: 'Rates' }"
          v-slot="{ href, navigate, isActive }"
        >
          <div
            class="block mb-2 hover:text-gray-900"
            :class="isActive ? 'text-gray-900' : 'text-gray-500'"
            :href="href"
            @click="navigate"
          >
            Sazby
          </div>
        </router-link>
        <router-link
          :to="{ name: 'Users' }"
          v-slot="{ href, navigate, isActive }"
        >
          <div
            class="block mb-2 hover:text-gray-900"
            :class="isActive ? 'text-gray-900' : 'text-gray-500'"
            :href="href"
            @click="navigate"
          >
            Uživatelé
          </div>
        </router-link>
      </nav>
    </div>
  </div>
</template>
