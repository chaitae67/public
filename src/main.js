import 'core-js/stable';
import 'regenerator-runtime/runtime';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axiosPlugin from './axios';
import store from'./store';

const app = createApp(App);

app.use(router);
app.mount('#app');
app.use(axiosPlugin);
app.use(store);