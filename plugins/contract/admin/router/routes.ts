export const routes = [
  {
    store: {
      contractStore: './state/contract-provider',
    },
  },
  {
    path: 'contracts',
    name: 'Contracts',
    component: './views/Contracts.vue',
  },
  {
    path: 'contracts/detail/:id?',
    name: 'ContractDetail',
    component: './views/Detail.vue',
  },
];
