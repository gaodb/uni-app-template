import Vue from 'vue'
import App from './App'
import 'windi.css'

import store from './store'
Vue.prototype.$store = store

// #ifdef H5
import VConsole from 'vconsole'
if (process.env.NODE_ENV == "development") {
	new VConsole({
		maxLogNumber: 1000
	})
}
// #endif

Vue.config.productionTip = (process.env.NODE_ENV == "production")

App.mpType = 'app'

const app = new Vue({
	...App
})
//尝试获取本地保存用户信息
store.commit('updateUserInfo', uni.getStorageSync('userInfo'));
app.$mount()