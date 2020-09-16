import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import "./registerServiceWorker";

// Import USWDS
Vue.use(require("uswds"));
// USWDS Styles
import "../node_modules/uswds/dist/scss/uswds.scss";

// Import Project independent styles
import "./styles/base.scss";

Vue.config.productionTip = false;
Vue.use(require("vue-moment"));

let app = "";

import { store } from "@/store/store";

// Lodash
import VueLodash from 'vue-lodash'
import lodash from 'lodash'


// Create vue app
if (!app) {
	app = new Vue({
		router,
		store,
		data: {
		},
		render: h => h(App)
	}).$mount("#app");
}
