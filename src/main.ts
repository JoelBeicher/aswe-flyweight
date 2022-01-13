import { createApp } from "vue";
import Buefy from "buefy";
import Main from "./Main.vue";
// @ts-ignore
createApp(Main).use(Buefy.Default).mount("#app");