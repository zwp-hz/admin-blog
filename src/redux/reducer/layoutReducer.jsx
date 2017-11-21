/**
 * 加载状态
 * @return
 */
const loading = (state = false, action) => {
	switch(action.type) {
		case 'LOADING':
			return action.loading;
		default:
			return state;
	}
}

/**
 * 导航栏数据
 * @return
 */
const collapsed = (state = false, action) => {
	switch(action.type) {
		case 'COLLAPSED':
			return action.collapsed;
		default:
			return state;
	}
}

export { loading, collapsed };