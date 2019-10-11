import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/login/login.vue'
import Forget from '../pages/login/forget.vue'
import Home from '../pages/home/home.vue'
import Zixun from '../pages/home/children/zixun.vue'
import Kecheng from '../pages/home/children/kecheng.vue'
import Tiku from '../pages/home/children/tiku.vue'
import Xiaoxi from '../pages/home/children/xiaoxi.vue'
import Fankui from '../pages/home/children/fankui.vue'
import Zhaoping from '../pages/home/children/zhaoping.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
		{
			path: '/forget',
			component: Forget
		},	
		{
			path: '/home',
			component: Home,
			children: [{
				path: 'zixun',
				component: Zixun,
			}, 
			{
				path: 'kecheng', 
				component: Kecheng,
			},
			{
				path: 'tiku', 
				component: Tiku,
			},
			{
				path: 'xiaoxi', 
				component: Xiaoxi,
			},
			{
				path: 'fankui', 
				component: Fankui,
			},
			{
				path: 'zhaoping', 
				component: Zhaoping,
			},]
		},
  ]
})
