import { doQuery, doMutation } from '/~composables/graphql';
import { reactive, readonly } from 'vue';

const state = reactive({
  pages: [],
  loaded: false,
});

async function getPages() {
  if (!state.loaded) {
    const {
      data: { pages },
      errors,
    } = await doQuery(
      `pages{_id, title}`,
    );
    state.pages.push(...pages);
    state.loaded = true;
  }
  return state.pages;
}

async function getPage(id) {
  let preparedPage;

  if (!state.pages.length) {
    const {
      data: { page },
      errors,
    } = await doQuery(
      `page(_id: "${id}"){_id, titlet}`,
    );
    state.pages.push(page);
    preparedPage = page;
  } else {
    const page = state.pages.find((page) => page._id == id);
    preparedPage = page;
    if (typeof page == 'undefined') {
      const {
        data: { page },
        errors,
      } = await doQuery(
        `page(_id: "${id}"){_id, titlet}`,
      );
      state.pages.push(page);
      preparedPage = page;
    }
  }
  return preparedPage;
}

async function createPage(localPage) {
  const {
    data: { createPage: page },
    errors,
  } = await doMutation(
    `createPage(page: {
            title: "${localPage.title}"
          }) {
            _id,
            title
          }`,
  );
  state.pages.push(page);
}

async function updatePage(localPage) {
  const {
    data: { updatePage: page },
    errors,
  } = await doMutation(
    `updatePage(page: {
            _id: "${localPage._id}",
            title: "${localPage.title}"
          }) {
            _id,
            title
          }`,
  );
  const index = state.pages.findIndex((r) => r._id == page._id);
  state.pages[index] = page;
}

async function deletePage(_id) {
  const { data, errors } = await doMutation(`deletePage(_id: "${_id}")`);
  const index = state.pages.findIndex((r) => r._id == _id);
  state.pages.splice(index, 1);
}

export const pageStore = readonly({
  state,
  getPages,
  getPage,
  createPage,
  updatePage,
  deletePage,
});
