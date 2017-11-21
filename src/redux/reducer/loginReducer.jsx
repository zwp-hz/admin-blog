/**
 * 用户信息
 * @return
 */
const userInfo = (state = {}, action) => {
	switch(action.type) {
		case 'USERINFO':
			return action.data;
		default:
			return state;
	}
}

export { userInfo };