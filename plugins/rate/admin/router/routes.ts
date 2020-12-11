export const routes = [
  {
    store: {
      rateStore: './state/rate-provider',
    },
  },
  {
    path: 'rates',
    name: 'Rates',
    component: './views/Rates.vue',
  },
  {
    path: 'rates/detail/:id?',
    name: 'RateDetail',
    component: './views/Detail.vue',
  },
];
