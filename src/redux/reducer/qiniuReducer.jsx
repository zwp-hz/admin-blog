/**
 * 七牛资源列表
 * @return
 */
const qiniuList = (state = {}, action) => {
	switch(action.type) {
		case 'QINIU_LIST':
			return action.data;
		default:
			return state;
	}
}

export { qiniuList };