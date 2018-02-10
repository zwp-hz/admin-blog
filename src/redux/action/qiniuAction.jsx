/**
 * 公共 action
 * @return
 */
import { Message } from 'antd';
import service from '../../services/service';
import { loading } from './layoutAction';

/**
 * 用于页面七牛资源渲染
 * @return
 */
const qiniuList = (data) => {
    return {
        type: 'QINIU_LIST',
        data
    }
}

/**
 * 获取七牛资源列表
 * @params {type}       判断是否指定目录分隔符
 * @params {prefix}     文件前缀
 * fn                   回调函数
 * @return {资源列表}
 */
const getQiniuList = (params,fn) => {
    return dispatch => {
        dispatch(loading(true));
        service.getQiniuList(params, (res) => {
            dispatch(loading(false));
            if(res.code === 0) {
                if (fn) fn(res.data);
            	dispatch(qiniuList(res.data));
            } else {
                Message.error(res.message);
            }
        }, () => {
            Message.error("接口请求错误");
        });
    }
}

/**
 * 删除七牛对应空间文件
 * @params {key}        文件名
 * @fn                  回调函数
 */
const delete_qiniu = (params,fn) => {
    return dispatch => {
        service.delete_qiniu(params, (res) => {
            if(res.code === 0) {
                Message.success(res.message);
                if (fn) fn();
            } else {
                Message.error(res.message);
            }
        }, () => {
            Message.error('接口请求错误');
        });
    }
}

export { getQiniuList, delete_qiniu };