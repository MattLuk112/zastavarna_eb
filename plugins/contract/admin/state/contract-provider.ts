import { doQuery, doMutation } from '/~composables/graphql';
import { reactive, computed, readonly } from 'vue';

const state = reactive({
  contracts: [],
  loaded: false,
});

async function getContracts() {
  if (!state.loaded) {
    const {
      data: { contracts },
      errors,
    } = await doQuery(
      `contracts{_id, client{ _id, firstName, lastName, street, city, idCard, birthNumber, nationality, sex }, itemName, itemPrice, loanAmount, payDate, totalInterest, dayInterest, totalPrice, createdAt }`,
    );
    state.loaded = true;
    state.contracts.push(...contracts);
  }
  return state.contracts;
}

async function getContract(id) {
  let preparedContract;

  if (!state.contracts.length) {
    const {
      data: { contract },
      errors,
    } = await doQuery(
      `contract(_id: "${id}"){_id, client{ _id, firstName, lastName, street, city, idCard, birthNumber, nationality, sex }, itemName, itemPrice, loanAmount, payDate, totalInterest, dayInterest, totalPrice, createdAt }`,
    );
    state.contracts.push(contract);
    preparedContract = contract;
  } else {
    const contract = state.contracts.find((contract) => contract._id == id);
    preparedContract = contract;
    if (typeof contract == 'undefined') {
      const {
        data: { contract },
        errors,
      } = await doQuery(
        `contract(_id: "${id}"){_id, client{ _id, firstName, lastName, street, city, idCard, birthNumber, nationality, sex }, itemName, itemPrice, loanAmount, payDate, totalInterest, dayInterest, totalPrice, createdAt }`,
      );
      state.contracts.push(contract);
      preparedContract = contract;
    }
  }
  return preparedContract;
}

async function createContract(localContract) {
  let client = '';
  if (localContract.client._id) {
    client = localContract.client._id;
  } else {
    const {
      data: { createClient: clientId },
      errors,
    } = await doMutation(
      `createClient(client: {
        firstName: "${localContract.client.firstName}",
        lastName: "${localContract.client.lastName}",
        street: "${localContract.client.street}",
        city: "${localContract.client.city}",
        idCard: "${localContract.client.idCard}",
        birthNumber: "${localContract.client.birthNumber}",
        nationality: "${localContract.client.nationality}",
        sex: "${localContract.client.sex}",
      }) {
        _id
      }`,
    );
    client = clientId;
  }
  const {
    data: { createContract: contract },
    errors,
  } = await doMutation(
    `createContract(contract: {
            client: "${client}",
            itemName: "${localContract.itemName}",
            itemPrice: ${localContract.itemPrice},
            payDate: "${localContract.payDate}",
            loanAmount: ${localContract.loanAmount},
            rate: "${localContract.rate}",
            totalInterest: ${localContract.totalInterest},
            dayInterest: ${localContract.dayInterest},
            totalPrice: ${localContract.totalPrice},
          }) {
            _id,
            client{ 
              _id,
              firstName,
              lastName,
              street,
              city,
              idCard,
              birthNumber,
              nationality,
              sex
            },
            itemName,
            itemPrice,
            payDate,
            loanAmount,
            rate{ _id },
            totalInterest,
            dayInterest,
            totalPrice,
          }`,
  );
  state.contracts.push(contract);
}

async function deleteContract(_id) {
  const { data, errors } = await doMutation(`deleteContract(_id: "${_id}")`);
  const index = state.contracts.findIndex((c) => c._id == _id);
  state.contracts.splice(index, 1);
}

export const contractStore = readonly({
  state,
  getContracts,
  getContract,
  createContract,
  deleteContract,
});
