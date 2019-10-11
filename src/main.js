// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from 'axios'
Vue.prototype.axios=axios
Vue.prototype.yuming = "http://47.101.155.73:8080/test"
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);
Vue.config.productionTip = false
import './assets/iconfont/iconfont.css'
import store from './store'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,

  components: { App },
  template: '<App/>'
})
