// #warning webview UserAgent 关键字
// uniAnimalCheck 安徽省动物检验检疫信息管理平台
const appUserAgentKey = 'uniAnimalCheck'

function finishPage() {
	if (getCurrentPages().length > 1) {
		window.history.back();
		return
	}
	const res = uni.getSystemInfoSync();
	if (res.platform == 'ios') {
		window.webkit && window.webkit.messageHandlers.finishPage.postMessage({});
	} else if (res.platform == 'android') {
		window.androidybself && window.androidybself.finishPage();
		window.android && window.android.finishPage();
	}
}

function loginExpired() {
	const res = uni.getSystemInfoSync();
	if (res.platform == 'ios') {
		window.webkit && window.webkit.messageHandlers.loginExpired.postMessage({});
	} else if (res.platform == 'android') {
		window.androidybself && window.androidybself.loginExpired();
		window.android && window.android.loginExpired();
	}
}

function savePic(picUrl) {
	const res = uni.getSystemInfoSync();
	if (res.platform == 'ios') {
		window.webkit && window.webkit.messageHandlers.savePic.postMessage(picUrl);
	} else if (res.platform == 'android') {
		window.androidybself && window.androidybself.savePic(picUrl);
		window.android && window.android.savePic(picUrl);
	}
}

function makePhoneCall(phoneNumber) {
	const res = uni.getSystemInfoSync();
	if (res.platform == 'ios') {
		window.webkit && window.webkit.messageHandlers.makePhoneCall.postMessage(phoneNumber);
	} else if (res.platform == 'android') {
		uni.makePhoneCall({
			phoneNumber: phoneNumber
		})
	}
}

function getScanResult() {
	return new Promise((resolve, reject) => {
		const res = uni.getSystemInfoSync();
		if (res.platform == 'ios') {
			window.showResult = (res) => {
				resolve(res);
			};
			window.webkit && window.webkit.messageHandlers.scan.postMessage({});
		} else if (res.platform == 'android') {
			window.showResult = (res) => {
				resolve(res);
			};
			window.androidybself && window.androidybself.scan();
			window.android && window.android.scan();
		}
	})
}

// 获取定位，获取的坐标系是gcj02坐标系，具体看是否需要转换
// 返回数据结构如下
//  {
//   "latitude" : Number,
//   "longitude" : Number,
//   "address" : String,
//   "speed" : Number
//  }
// 注释：安卓机关事务系列获取定位方法window.em是在webView加载的时候（考勤打卡）提前注入的
function getLocationResult() {
	return new Promise((resolve, reject) => {
		const res = uni.getSystemInfoSync();
		if (res.platform == 'ios') {
			window.iOSCallBack = {
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					reject(err);
				}
			};
			window.webkit && window.webkit.messageHandlers.mlem.postMessage({});
		} else if (res.platform == 'android') {
			window.em && window.em.getLocation({
				type: "gcj02",
				success: (res) => {
					resolve(res);
				},
				fail: (err) => {
					reject(err);
				}
			})
		}
	})
}

const bridge = {
	appUserAgentKey: appUserAgentKey,
	finishPage: finishPage,
	loginExpired: loginExpired,
	savePic: savePic,
	makePhoneCall: makePhoneCall,
	getScanResult: getScanResult,
	getLocationResult: getLocationResult
}

export default bridge