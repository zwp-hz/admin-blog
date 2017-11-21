/**
 * 登录界面action
 * @return
 */
import { Message } from 'antd';
import { browserHistory } from 'react-router';
import service from '../../services/service';
import { loading } from './layoutAction';

/**
 * 用于页面和区块的加载中状态
 * @return
 */
const userInfo = (data) => {
    return {
        type: 'USERINFO',
        data
    }
}

/**
 * 登录
 * @param {username} 用户名
 * @param {password} 密码
 * @return {登录信息}
 */
const goLogin = (params) => {
    return dispatch => {
        dispatch(loading(true));
        service.goLogin(params, (res) => {
            dispatch(loading(false));
            if(res.code === 0) {
                Message.success(res.message);
                browserHistory.push('/index');
            } else {
                Message.error(res.message);
            }
        }, () => {
            Message.error('接口请求错误');
        })
    }
}

export { goLogin, userInfo }