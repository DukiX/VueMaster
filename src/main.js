import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

Vue.prototype.$apiUri = "https://localhost:44337/api";
Vue.prototype.$login = "/account/login";
Vue.prototype.$refresh = "/account/refresh";
Vue.prototype.$user = "/account";
Vue.prototype.$image = "/account/image";
Vue.prototype.$register = "/account/register";
Vue.prototype.$changePassword = "/account/change-password";
Vue.prototype.$products = "/products";
Vue.prototype.$productsUploadImage = "/products/upload-image";

export default () => {

}
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
 