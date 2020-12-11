import { doQuery } from '/~composables/graphql';
import { reactive, readonly } from 'vue';
import { doMutation } from '../../../../kikimore/composables/graphql';

const state = reactive({
  clients: [],
  loaded: false,
});

async function getClients() {
  if (!state.loaded) {
    const {
      data: { clients },
      errors,
    } = await doQuery(
      `clients{_id, firstName, lastName, street, city, idCard, birthNumber, nationality, sex}`,
    );
    state.loaded = true;
    state.clients.push(...clients);
  }
  return state.clients;
}

async function getClient(id) {
  let preparedClient;

  if (!state.clients.length) {
    const {
      data: { client },
      errors,
    } = await doQuery(
      `client(_id: "${id}"){_id, firstName, lastName, street, city, idCard, birthNumber, nationality, sex}`,
    );
    state.clients.push(client);
    preparedClient = client;
  } else {
    const client = state.clients.find((client) => client._id == id);
    preparedClient = client;
    if (typeof client == 'undefined') {
      const {
        data: { client },
        errors,
      } = await doQuery(
        `client(_id: "${id}"){_id, firstName, lastName, street, city, idCard, birthNumber, nationality, sex}`,
      );
      state.clients.push(client);
      preparedClient = client;
    }
  }
  return preparedClient;
}

async function createClient(localClient) {
  const {
    data: { createClient: client },
    errors,
  } = await doMutation(
    `createClient(client: {
            firstName: "${localClient.firstName}",
            lastName: "${localClient.lastName}",
            street: "${localClient.street}",
            city: "${localClient.city}",
            idCard: "${localClient.idCard}",
            birthNumber: "${localClient.birthNumber}",
            nationality: "${localClient.nationality}",
            sex: "${localClient.sex}",
          }) {
            _id,
          firstName,
          lastName,
          street,
          city,
          idCard,
          birthNumber,
          nationality,
          sex
          }`,
  );
  state.clients.push(client);
}

export const clientStore = readonly({
  state,
  getClients,
  getClient,
  createClient,
});
