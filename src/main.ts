import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import { Button } from "element-ui";
// import Grid from 'vue-js-grid';//在my-module.d.ts中声明下此模块
// Vue.use(Grid)
// let Grid = require('vue-js-grid')
Vue.config.productionTip = false;
Vue.use(Button);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
