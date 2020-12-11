import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
// import { adminTheme } from 'vue-theme-admin';

// const app = createApp(__DEFAULT_THEME__ ? App : adminTheme);
const app = createApp(App);

app.use(router);
app.mount('#app');
