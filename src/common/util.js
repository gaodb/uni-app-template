//enable 是否可以交互
function showLoading(t, enable) {
	let title = '加载中...'
	if (t) {
		title = t
	}
	uni.showLoading({
		title: title,
		mask: !enable
	})
}

function hideLoading() {
	uni.hideLoading()
}

function showToast(title, complete) {
	uni.showToast({
		title: title,
		icon: 'none',
		mask: complete ? true : false
	})
	if (complete) {
		setTimeout(() => {
			complete()
		}, 1500);
	}
}

function notBlankStr(str) {
	if (str == null || str == undefined || str == '') {
		return false;
	} else {
		var regStr = str.toString();
		regStr = regStr.replace(/ /g, "");
		regStr = regStr.replace(/\r\n/g, "");
		regStr = regStr.replace(/\n/g, "");

		//console.log('test' + regStr + 'test')
		if (regStr.length == 0) {
			return false;
		} else {
			return true;
		}
	}
}

function nullStrDefault(str, value) {
	return notBlankStr(str) ? str : (value ? value : "")
}

//digit 整数位数，decimal 小数位数
function formatMoney(value, digit, decimal) {
	// 如果输入非数字，则替换为''
	let newValue = value.replace(/[^\d\.]/g, '');
	// 必须保证第一个为数字而不是.     
	newValue = newValue.replace(/^\./g, '');
	// 保证只有出现一个.而没有多个.     
	newValue = newValue.replace(/\.{2,}/g, '.');
	//前两位不能是0加数字
	newValue = newValue.replace(/^0\d[0-9]*/g, '');
	// 保证.只出现一次，而不能出现两次以上     
	newValue = newValue.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
	// 限制小数位数
	let decimalReg = RegExp(`^(.*\\..{${decimal}}).*$`);
	newValue = newValue.replace(decimalReg, "$1");

	// 根据位数限制最大值
	var max = 0
	for (var i = 0; i < digit; i++) {
		max += (Math.pow(10, i) * 9)
	}
	for (var i = 1; i <= decimal; i++) {
		max += (Math.pow(10, -i) * 9)
	}
	if (newValue > max) {
		newValue = max.toFixed(decimal).toString()
		showToast('最大值为' + newValue)
	}
	return newValue
}

function formatTime(time) {
	if (typeof time !== 'number' || time < 0) {
		return time
	}

	var hour = parseInt(time / 3600)
	time = time % 3600
	var minute = parseInt(time / 60)
	time = time % 60
	var second = time

	return ([hour, minute, second]).map(function (n) {
		n = n.toString()
		return n[1] ? n : '0' + n
	}).join(':')
}

function formatLocation(longitude, latitude) {
	if (typeof longitude === 'string' && typeof latitude === 'string') {
		longitude = parseFloat(longitude)
		latitude = parseFloat(latitude)
	}

	longitude = longitude.toFixed(2)
	latitude = latitude.toFixed(2)

	return {
		longitude: longitude.toString().split('.'),
		latitude: latitude.toString().split('.')
	}
}
var dateUtils = {
	UNITS: {
		'年': 31557600000,
		'月': 2629800000,
		'天': 86400000,
		'小时': 3600000,
		'分钟': 60000,
		'秒': 1000
	},
	humanize: function (milliseconds) {
		var humanize = '';
		for (var key in this.UNITS) {
			if (milliseconds >= this.UNITS[key]) {
				humanize = Math.floor(milliseconds / this.UNITS[key]) + key + '前';
				break;
			}
		}
		return humanize || '刚刚';
	},
	format: function (dateStr) {
		var date = this.parse(dateStr)
		var diff = Date.now() - date.getTime();
		if (diff < this.UNITS['天']) {
			return this.humanize(diff);
		}
		var _format = function (number) {
			return (number < 10 ? ('0' + number) : number);
		};
		return date.getFullYear() + '/' + _format(date.getMonth() + 1) + '/' + _format(date.getDate()) + '-' +
			_format(date.getHours()) + ':' + _format(date.getMinutes());
	},
	parse: function (str) { //将"yyyy-mm-dd HH:MM:ss"格式的字符串，转化为一个Date对象
		var a = str.split(/[^0-9]/);
		return new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
	}
};

// 校验手机号
function checkPhone(phone) {
	if (!(phone && phone.length > 0)) {
		return false
	}
	let reg = /^1[3|4|5|6|7|8|9]\d{9}$/
	if (!reg.test(phone)) {
		return false
	}
	return true
}

// 获取url中参数
function getQueryVariable(variable) {
	let query = window.location.search.substring(1);
	let vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		let pair = vars[i].split("=");
		if (pair[0] == variable) {
			return pair[1];
		}
	}
	// 防止上面取不到，在通过下面方式取一次
	let url = window.location.href;
	let pattern = new RegExp("[\?\&]" + variable + "=([^\&]+)", "i"); // 正则匹配URL
	let matcher = pattern.exec(url);
	if (matcher == null || matcher.length < 1) {
		return "";
	}
	return decodeURIComponent(matcher[1]);
}

// 图片url转base64
function getBase64Image(url) {
	return new Promise((resolve, reject) => {
		let image = new Image()
		image.setAttribute('crossOrigin', 'Anonymous')
		image.src = url + '?v=' + Math.random() // 处理缓存
		image.onload = function () {
			let canvas = document.createElement('canvas')
			canvas.width = image.width
			canvas.height = image.height
			let ctx = canvas.getContext('2d')
			ctx.drawImage(image, 0, 0, image.width, image.height)
			let base64Image = canvas.toDataURL('image/png')
			let base64Str = base64Image.replace(/^data:image\/png;base64,/, '')
			resolve(base64Str)
		}
		image.onerror = () => {
			reject(new Error('urlToBase64 error'));
		}
	})
}

function nullArrDefault(arr) {
	if (Array.isArray(arr)) {
		return arr
	}
	return []
}

// 校验密码格式
function checkPassword(pwd) {
	if (!(pwd && pwd.length >= 8)) {
		return false
	}
	let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![0-9a-zA-Z]+$)(?![0-9\W]+$)(?![a-zA-Z\W]+$)[0-9A-Za-z\W]{8,15}$/
	if (!reg.test(pwd)) {
		return false
	}
	return true
}

const util = {
	formatTime: formatTime,
	formatLocation: formatLocation,
	dateUtils: dateUtils,
	showLoading: showLoading,
	hideLoading: hideLoading,
	showToast: showToast,
	notBlankStr: notBlankStr,
	nullStrDefault: nullStrDefault,
	formatMoney: formatMoney,
	checkPhone: checkPhone,
	getQueryVariable: getQueryVariable,
	getBase64Image: getBase64Image,
	nullArrDefault: nullArrDefault,
	checkPassword: checkPassword
}

export default util