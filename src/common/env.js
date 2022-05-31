//环境定义
const release = 'release', // 生产环境
	test = 'test', // 测试环境
	dev = 'dev', // 开发环境
	temp = 'temp'; // 预留环境

// #warning 当前环境
const apiEnv = test;

const baseUrl = (function () {
	if (apiEnv == release) {
		return 'http://lawgateway.govicar.com:50001/'
	} else if (apiEnv == test) {
		return 'http://117.71.53.199:59169/'
	} else if (apiEnv == dev) {
		return 'http://10.5.4.90:8223/'
	} else {
		return 'http://10.5.4.90:8223/'
	}
})()

const mqttHost = (function () {
	if (apiEnv == release) {
		return 'ws://imessage.broker.luoex.xin:20556/'
	} else if (apiEnv == test) {
		return 'ws://10.5.4.27:20556/'
	} else if (apiEnv == dev) {
		return 'ws://10.5.4.27:20556/'
	} else {
		return 'ws://10.5.4.27:20556/'
	}
})()

const env = {
	release: release,
	test: test,
	dev: dev,
	temp: temp,
	apiEnv: apiEnv,
	baseUrl: baseUrl,
	mqttHost: mqttHost
}

export default env