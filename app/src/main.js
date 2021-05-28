import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/css/reset.css"; // reset css

createApp(App).use(store).use(router).mount("#app");