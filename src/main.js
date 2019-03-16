import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
// Vue.config.ignoredElements = ["ThreeContainer"];

new Vue({
  render: h => h(App)
}).$mount("#app");
