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
  {
    path: 'contracts/print/:id?',
    name: 'ContractPrint',
    component: './views/Print.vue',
  },
  {
    path: 'contracts/summary',
    name: 'Summary',
    component: './views/Summary.vue',
  },
];
