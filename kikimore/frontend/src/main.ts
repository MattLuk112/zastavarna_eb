import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';

// import { frontendTheme } from 'vue-theme-frontend';

// const app = createApp(__DEFAULT_THEME__ ? App : frontendTheme);
const app = createApp(App);

app.use(router);
app.provide('adminPath', __ADMIN_PATH__);
app.mount('#app');
