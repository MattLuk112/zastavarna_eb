import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import { components } from '/~plugins/ui';
// import { adminTheme } from 'vue-theme-admin';

// const app = createApp(__DEFAULT_THEME__ ? App : adminTheme);
const app = createApp(App);

// Global components
components.forEach(component => {
    app.component(component.name, component);
});

app.use(router);
app.mount('#app');
