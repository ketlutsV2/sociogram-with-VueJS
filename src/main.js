import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "@/router";
import APIcallback from "@/plugins/APIcallback";
import SwalAlert from "@/plugins/SwalAlert";
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueGoodTablePlugin from 'vue-good-table-next';
import 'vue-good-table-next/dist/vue-good-table-next.css'


const app = createApp(App);

const rootComponent = app
  .use(router)
  .use(store)
  .use(APIcallback)
  .use(SwalAlert)
  .use(VueSweetalert2)
  .use(VueGoodTablePlugin)
  .mount("#app");



