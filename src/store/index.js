import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		userInfo: null,
		mqttClientNotice: null,
	},
	mutations: {
		updateUserInfo(state, provider) {
			state.userInfo = provider ? provider : null;
		},
		updateMqttClientNotice(state, provider) {
			state.mqttClientNotice = provider;
		},
	}
})

export default store