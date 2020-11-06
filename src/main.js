import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.prototype.$apiUri = "https://localhost:44337/api";
Vue.prototype.$login = "/account/login";
Vue.prototype.$refresh = "/account/refresh";
Vue.prototype.$user = "/account";
Vue.prototype.$image = "/account/image";
Vue.prototype.$register = "/account/register";

export default () => {

}
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
 