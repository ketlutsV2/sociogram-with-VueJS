import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "@/router";
import APIcallback from "@/plugins/APIcallback";

const app = createApp(App);

const rootComponent = app
  .use(router)
  .use(store)
  .use(APIcallback)
  .mount("#app");
