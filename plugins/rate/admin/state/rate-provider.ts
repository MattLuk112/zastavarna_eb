import { doQuery, doMutation } from '/~composables/graphql';
import { reactive, readonly } from 'vue';

const state = reactive({
  rates: [],
  loaded: false,
});

async function getRates() {
  if (!state.loaded) {
    const {
      data: { rates },
      errors,
    } = await doQuery(
      `rates{_id, name, percentageFromPrice, amount, days, maxPrice, maxDays, fineForLost}`,
    );
    state.rates.push(...rates);
    state.loaded = true;
  }
  return state.rates;
}

async function getRate(id) {
  let preparedRate;

  if (!state.rates.length) {
    const {
      data: { rate },
      errors,
    } = await doQuery(
      `rate(_id: "${id}"){_id, name, percentageFromPrice, amount, days, maxPrice, maxDays, fineForLost}`,
    );
    state.rates.push(rate);
    preparedRate = rate;
  } else {
    const rate = state.rates.find((rate) => rate._id == id);
    preparedRate = rate;
    if (typeof rate == 'undefined') {
      const {
        data: { rate },
        errors,
      } = await doQuery(
        `rate(_id: "${id}"){_id, name, percentageFromPrice, amount, days, maxPrice, maxDays, fineForLost}`,
      );
      state.rates.push(rate);
      preparedRate = rate;
    }
  }
  return preparedRate;
}

async function createRate(localRate) {
  const {
    data: { createRate: rate },
    errors,
  } = await doMutation(
    `createRate(rate: {
            name: "${localRate.name}",
            percentageFromPrice: ${localRate.percentageFromPrice},
            amount: ${localRate.amount},
            days: ${localRate.days},
            maxPrice: ${localRate.maxPrice},
            maxDays: ${localRate.maxDays},
            fineForLost: ${localRate.fineForLost},
          }) {
            _id,
            name,
            percentageFromPrice,
            amount,
            days,
            maxPrice,
            maxDays,
            fineForLost
          }`,
  );
  state.rates.push(rate);
}

async function updateRate(localRate) {
  const {
    data: { updateRate: rate },
    errors,
  } = await doMutation(
    `updateRate(rate: {
            _id: "${localRate._id}",
            name: "${localRate.name}",
            percentageFromPrice: ${localRate.percentageFromPrice},
            amount: ${localRate.amount},
            days: ${localRate.days},
            maxPrice: ${localRate.maxPrice},
            maxDays: ${localRate.maxDays},
            fineForLost: ${localRate.fineForLost},
          }) {
            _id,
            name,
            percentageFromPrice,
            amount,
            days,
            maxPrice,
            maxDays,
            fineForLost
          }`,
  );
  const index = state.rates.findIndex((r) => r._id == rate._id);
  state.rates[index] = rate;
}

async function deleteRate(_id) {
  const { data, errors } = await doMutation(`deleteRate(_id: "${_id}")`);
  const index = state.rates.findIndex((r) => r._id == _id);
  state.rates.splice(index, 1);
}

export const rateStore = readonly({
  state,
  getRates,
  getRate,
  createRate,
  updateRate,
  deleteRate,
});
