import { createApp } from "vue";
import Main from "./Main.vue";

import { Quasar } from 'quasar'
import quasarIconSet from 'quasar/icon-set/fontawesome-v5'

// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// ..required because of selected iconSet:
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'

// Import Quasar css
import 'quasar/src/css/index.sass'

createApp(Main)
  .use(Quasar, {
    plugins: {},
    iconSet: quasarIconSet
  })
  .mount("#app");