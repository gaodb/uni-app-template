function arrWithEnumObj(obj) {
	let arr = []
	for (const key in obj) {
		//new一个新的对象，重新分配内存
		let item = Object.assign({}, obj[key])
		arr.push(item)
	}
	return arr
}

const example = {
	all: {
		key: '',
		name: '全部',
		selected: true,
		icon: '',
	},
	IN_STORAGE: {
		key: 'IN_STORAGE',
		name: '入库申请',
		selected: false,
		icon: '',
	},
	OUTFIT: {
		key: 'OUTFIT',
		name: '配备申请',
		selected: false,
		icon: '',
	}
}

const enumerate = {
	arrWithEnumObj: arrWithEnumObj,
	example: example,
}

export default enumerate