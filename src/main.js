import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible/flexible'
import FastClick from 'fastclick';
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
import { Notify } from 'vant';
// 全局注册
Vue.use(Notify);
Vue.config.productionTip = false;
FastClick.attach(document.body)
const imgs = ['./assets/bg1.jpg','./assets/bg2.jpg','./assets/bg3.jpg','./assets/bg4.jpg']
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
