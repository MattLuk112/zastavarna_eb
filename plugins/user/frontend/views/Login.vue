<template>
  <div class="flex items-center justify-center w-screen h-screen bg-gray-300">
    <div class="relative p-12 text-gray-600 bg-gray-100 rounded shadow-sm">
      <input
        type="text"
        class="w-full px-4 py-2 placeholder-gray-400 border border-gray-300 rounded outline-none"
        placeholder="E-mail"
        v-model="email"
      />
      <input
        type="password"
        v-model="password"
        class="w-full px-4 py-2 mt-4 placeholder-gray-400 border border-gray-300 rounded outline-none"
        placeholder="Password"
      />
      <button
        class="w-full py-2 mt-4 font-bold uppercase bg-gray-300 rounded shadow-sm outline-none focus:outline-none hover:shadow-inner"
        :class="{
          'bg-green-300 hover:bg-green-500': valid,
          'cursor-not-allowed': !valid,
        }"
        @click="doLogin"
      >
        Login
      </button>
      <div class="mt-4 text-center">
        <span class="text-sm cursor-pointer hover:text-green-300"
          >Forgot password?</span
        >
      </div>
      <div
        class="absolute inset-x-0 px-4 py-3 mx-12 mt-5 text-center text-red-700 transition duration-300 ease-in-out bg-red-100 border border-red-400 rounded opacity-0"
        :class="{ 'opacity-100': error.show }"
        role="alert"
      >
        <span class="block sm:inline">{{ error.msg }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { doQuery } from '/~composables/graphql';
import { ref, computed, reactive, inject } from 'vue';
export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const error = reactive({
      show: false,
      msg: '',
    });
    const adminPath = inject('adminPath');

    const valid = computed(() => {
      let result = false;
      if (email.value && password.value) {
        result = true;
      }
      return result;
    });

    async function doLogin() {
      if (!valid.value) {
        return;
      }
      error.show = false;
      const {
        data: {
          loginUser: { token },
        },
        errors,
      } = await doQuery(`
                  loginUser(email:"${email.value}", password:"${password.value}"){
                    token
                  }`);
      if (errors) {
        (error.msg = errors[0].message), (error.show = true);
        return;
      }
      localStorage.setItem('jwt', token);
      location = adminPath;
    }

    return {
      email,
      password,
      doLogin,
      valid,
      error,
    };
  },
};
</script>
