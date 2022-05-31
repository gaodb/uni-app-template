import bridge from "./bridge.js"
import util from "./util.js"
import env from "./env.js"
import mqtt from 'mqtt';
import store from '../store/index';

const netErrorMsg = '网络请求失败'

function urlApi(api) {
	return env.baseUrl + api
}

function get(obj) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: obj.url,
			data: publicParams(obj.data),
			header: publicHeader(obj.header),
			method: 'GET',
			success(res) {
				reqCallback(obj.url, resolve, true, res);
			},
			fail(res) {
				reqCallback(obj.url, resolve, false, res);
			}
		})
	})
}

function post(obj) {
	return new Promise((resolve, reject) => {
		obj.header = Object.assign({
			'content-type': 'application/x-www-form-urlencoded'
		}, obj.header)
		uni.request({
			url: obj.url,
			data: publicParams(obj.data),
			header: publicHeader(obj.header),
			method: 'POST',
			success(res) {
				reqCallback(obj.url, resolve, true, res);
			},
			fail(res) {
				reqCallback(obj.url, resolve, false, res);
			}
		})
	})
}

function postJson(obj) {
	return new Promise((resolve, reject) => {
		obj.header = Object.assign({
			'content-type': 'application/json'
		}, obj.header)
		uni.request({
			url: obj.url,
			data: publicParams(obj.data),
			header: publicHeader(obj.header),
			method: 'POST',
			success(res) {
				reqCallback(obj.url, resolve, true, res);
			},
			fail(res) {
				reqCallback(obj.url, resolve, false, res);
			}
		})
	})
}

function putJson(obj) {
	return new Promise((resolve, reject) => {
		obj.header = Object.assign({
			'content-type': 'application/json'
		}, obj.header)
		uni.request({
			url: obj.url,
			data: publicParams(obj.data),
			header: publicHeader(obj.header),
			method: 'PUT',
			success(res) {
				reqCallback(obj.url, resolve, true, res);
			},
			fail(res) {
				reqCallback(obj.url, resolve, false, res);
			}
		})
	})
}

function reqCallback(url, cb, success, res) {
	uni.hideLoading()
	uni.stopPullDownRefresh()
	if (cb == null || cb == undefined) {
		return
	}
	if (url.indexOf('mlyun-auth/server/auth/login') == -1) {
		//说明不是登录接口，需要判断处理登录失效的情况
		if (loginExpired(res)) {
			return
		}
	}
	if (success) {
		cb({
			success: res.data.success,
			msg: res.data.message,
			result: res,
			data: res.data.data
		})
	} else {
		cb({
			success: false,
			msg: netErrorMsg,
			result: res,
			data: {}
		})
	}
}

//处理登录过期
function loginExpired(res) {
	let code = res.statusCode
	if (code == 401 || code == 412 || code == 417) {
		mqttClientEnd();
		store.commit('updateUserInfo', null);
		uni.removeStorageSync('userInfo');
		// #warning 处理登录过期
		uni.reLaunch({
			url: '/pages/login/login'
		})
		return true
	}
	return false
}

function publicHeader(obj) {
	let userInfo = store.state.userInfo
	let header = {}
	if (userInfo && userInfo.token) {
		header.Authorization = userInfo.token
	}
	header.systemParam = JSON.stringify(getSystemParam())
	return Object.assign(header, obj);
}

function getSystemParam() {
	const res = uni.getSystemInfoSync();
	let userInfo = store.state.userInfo
	let systemParam = {
		terminalType: res.platform,
		phoneSystem: res.system,
		platform: 'uni',
		appPackageId: 'com.app.uni.animalCheck',
		appChannel: '',
		version: '1.0.0'
	}
	if (userInfo && userInfo.authId) {
		systemParam.authId = userInfo.authId
	}
	return systemParam
}

function publicParams(data) {
	let res = data
	// 不用传
	// if (Object.prototype.toString.call(res) === '[object Object]') {
	// 	return Object.assign(res, getSystemParam());
	// }
	return res
}

function uploadFileReq(path) {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: urlApi('mlyun-base/sysFileDetail/upload'),
			filePath: path,
			name: 'file',
			header: publicHeader({}),
			success: (res) => {
				if (res.statusCode == 200) {
					let json = JSON.parse(res.data)
					if (json.success) {
						let data = json.data
						data.url = data.path
						resolve(data)
					} else {
						resolve();
					}
				} else {
					resolve();
				}
			},
			fail: (res) => {
				resolve();
			}
		})
	})
}

function uploadFileArr(tempPaths) {
	return new Promise((resolve, reject) => {
		let promiseArr = []
		for (var i = 0; i < tempPaths.length; i++) {
			promiseArr.push(uploadFileReq(tempPaths[i]))
		}
		if (promiseArr.length > 0) {
			util.showLoading()
			Promise.all(promiseArr).then((data) => {
				util.hideLoading()
				let success = true
				for (var i = 0; i < data.length; i++) {
					let item = data[i]
					if (!item) {
						success = false
						break
					}
				}
				if (success && data.length > 0) {
					resolve(data)
				} else {
					util.showToast('上传失败')
				}
			})
		}
	})
}

function resetMsgWorkBadge() {
	let userInfo = store.state.userInfo
	if (userInfo && userInfo.currentStaffId) {
		get({
			url: urlApi(`mlyun-base/app/getAppNavigationNum`),
			data: {
				staffId: userInfo.currentStaffId
			}
		}).then((res) => {
			if (res.success) {
				setBadgeValue(res.data.messageNum, res.data.workbenchNum);
			} else {
				setBadgeValue(0, 0);
			}
		})
	} else {
		setBadgeValue(0, 0);
	}

	function setBadgeValue(msg, work) {
		let msgStr = '';
		if (msg) {
			msgStr = msg.toString();
		}
		let workStr = '';
		if (work) {
			workStr = work.toString();
		}
		if (util.notBlankStr(msgStr) && msgStr > 0) {
			uni.setTabBarBadge({
				index: 0,
				text: msgStr
			});
		} else {
			uni.removeTabBarBadge({
				index: 0
			})
		}

		if (util.notBlankStr(workStr) && workStr > 0) {
			uni.setTabBarBadge({
				index: 1,
				text: workStr
			});
		} else {
			uni.removeTabBarBadge({
				index: 1
			})
		}
	}
}

function mqttConnect(staffId) {
	mqttClientEnd();
	if (!util.notBlankStr(staffId)) {
		return;
	}
	let topic = `8500@3400@000000_${staffId}`;
	let mqttClient = mqtt.connect(`${env.mqttHost}mqtt`, {
		clean: true,
		keepalive: 30,
		username: "{'routerIdentification': '8200@3400@000000'}",
		password: '',
		clientId: topic
	})
	//连接成功
	mqttClient.on('connect', function () {
		mqttClient.subscribe(topic, function (err) {
			if (err) {
				console.log(err);
			}
		})
	})
	//收到消息
	mqttClient.on('message', function (topicVal, message) {
		// message is Buffer
		// console.log(message.toString());
	})
	store.commit('updateMqttClientNotice', mqttClient);
}

function mqttClientEnd() {
	let mqttClient = store.state.mqttClientNotice;
	if (mqttClient) {
		mqttClient.end(true);
	}
}

const req = {
	netErrorMsg: netErrorMsg,
	urlApi: urlApi,
	publicHeader: publicHeader,
	postJson: postJson,
	putJson: putJson,
	post: post,
	get: get,
	uploadFileArr: uploadFileArr,
	uploadFileReq: uploadFileReq,
	resetMsgWorkBadge: resetMsgWorkBadge,
	mqttConnect: mqttConnect,
	mqttClientEnd: mqttClientEnd
}

export default req