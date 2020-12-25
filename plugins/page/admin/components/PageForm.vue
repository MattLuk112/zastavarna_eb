<template>
  <div class="max-w-3xl mx-auto lg:ml-0 lg:mr-auto">
    <div class="flex flex-wrap px-6 py-6 border-b xl:mx-0 xl:px-12">
      <div>
        <label for="" class="block mb-2 font-semibold text-md">Titulek</label>
        <base-text
          v-model="localPage.title"
        ></base-text>
      </div>

      <div>
        <label for="" class="block mb-2 font-semibold text-md">Obsah</label>
        <base-wysiwyg
          v-model="localPage.content"
        ></base-wysiwyg>
      </div>
    </div>
  </div>
</template>
<script>
import { inject, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  async setup() {
    const pageStore = inject('pageStore');
    let isNew = true;
    const route = useRoute();
    const id = route.params.id;
    const router = useRouter();

    let localPage = reactive({
      title: '',
      content: '',
    });

    if (id) {
      isNew = false;
      localPage = reactive(await pageStore.getPage(id));
    }

    async function save() {
      if (id) {
        await pageStore.updatePage(localPage);
      } else {
        await pageStore.createPage(localPage);
      }
      router.push({ name: 'Pages' });
    }

    async function deletePage() {
      if (id) {
        await pageStore.deletePage(id);
        router.push({ name: 'Pages' });
      }
    }

    return {
      localPage,
      save,
      deletePage,
    };
  },
};
</script>
