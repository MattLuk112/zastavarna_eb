<template>
  <div class="relative z-10 bg-gray-100">
    <header-component></header-component>
    <!-- WHITE BG -->
    <div
      class="fixed top-0 bottom-0 left-0 w-1/2 bg-white pointer-events-none -z-10"
    ></div>
    <!-- MAIN -->
    <div class="w-full max-w-screen-xl px-6 mx-auto">
      <div class="-mx-6 lg:flex">
        <!-- SIDEBAR -->
        <sidebar-component></sidebar-component>

        <!-- CONTENT -->
        <div
          class="w-full min-h-screen bg-white lg:static lg:max-h-full lg:overflow-visible lg:w-2/4 xl:w-3/5"
        >
          <div class="w-full pt-16 pb-16">
            <router-view></router-view>
          </div>
        </div>

        <!-- ASIDE -->
        <div
          class="fixed inset-0 hidden w-full h-full pt-16 -mb-16 border-b z-90 lg:-mb-0 lg:static lg:h-auto lg:overflow-y-visible lg:border-b-0 lg:pt-0 lg:w-1/4 lg:block lg:border-0 lg:border-l xl:w-1/5"
        >
          <div
            class="h-full overflow-hidden overflow-y-auto scrolling-touch bg-white lg:h-auto lg:block lg:sticky lg:bg-transparent top-4 lg:top-16"
          >
            <div
              class="px-6 pt-6 overflow-y-auto text-base lg:text-sm lg:py-12 lg:pl-6 lg:pr-8 lg:h-(screen-16)"
            >
              <!-- Chart -->
              <div class="flex">
                <div class="w-1/2">
                  <h4 class="font-semibold">Stav</h4>
                </div>
                <div class="w-1/2 text-right">
                  <span class="font-semibold"> 27 600 Kč </span>
                </div>
              </div>

              <div class="flex items-end pt-2 space-x-1">
                <div class="w-2 h-4 bg-gray-500"></div>
                <div class="w-2 h-6 bg-gray-500"></div>
                <div class="w-2 h-2 bg-gray-500"></div>
                <div class="w-2 h-8 bg-gray-500"></div>
                <div class="w-2 h-2 bg-gray-500"></div>
                <div class="w-2 h-10 bg-gray-500"></div>
                <div class="w-2 h-8 bg-gray-500"></div>
                <div class="w-2 h-2 bg-gray-500"></div>
                <div class="w-2 h-6 bg-gray-500"></div>
                <div class="w-2 h-5 bg-gray-500"></div>
                <div class="w-2 h-8 bg-gray-500"></div>
                <div class="w-2 h-8 bg-gray-500"></div>
                <div class="w-2 h-2 bg-gray-500"></div>
                <div class="w-2 h-1 bg-gray-500"></div>
                <div class="w-2 h-3 bg-gray-500"></div>
                <div class="w-2 h-5 bg-gray-500"></div>
                <div class="w-2 h-6 bg-gray-500"></div>
                <div class="w-2 h-10 bg-gray-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import HeaderComponent from './components/Header.vue';
import SidebarComponent from './components/Sidebar.vue';

export default {
  components: {
    HeaderComponent,
    SidebarComponent,
  },
};
</script>
