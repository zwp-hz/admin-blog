/**
 * 公共 action
 * @return
 */
import { Message } from 'antd';
import service from '../../services/service';
import { loading } from './layoutAction';
import { browserHistory } from 'react-router';

/**
 * 用于页面文章列表渲染
 * @return
 */
const articleList = (data) => {
    return {
        type: 'ARTICLE_LIST',
        data
    }
}

/**
 * 用于页面类别列表渲染
 * @return
 */
const categoryList = (data) => {
    return {
        type: 'CATEGORY_LIST',
        data
    }
}

/**
 * 用于页面标签列表渲染
 * @return
 */
const tagList = (data) => {
    return {
        type: 'TAG_LIST',
        data
    }
}

/**
 * 添加、编辑、删除 文章
 * @param {_id}             文章id (编辑标示)
 * @param {title}           标题
 * @param {categories}      类别
 * @param {tags}            标签
 * @param {images_src}      封面图
 * @param {content}         文章内容
 * @param {type}            操作类型  save：添加。 update：编辑。 remove：删除。
 * @return {status}
 */
const operateArticle = (params) => {
    return dispatch => {
        dispatch(loading(true));
        service.operateArticle(params, (res) => {
            dispatch(loading(false));
            if(res.code === 0) {
                Message.success(res.message);
                browserHistory.push('/article/list');
            } else {
                Message.error(res.message);
            }
        }, () => {
            Message.error('接口请求错误');
        });
    }
}


/**
 * 获取文章列表
 * @param {page} 分页
 * @param {categories} 标签
 * @fn    成功回调
 * @return {文章列表}
 */
const getArticleList = (params,fn) => {
    return dispatch => {
        dispatch(loading(true));
        service.getArticleList(params, (res) => {
            dispatch(loading(false));
            if(res.code === 0) {
                if (fn)
                    fn(res.data)
                else
            	   dispatch(articleList(res.data));
            } else {
                Message.error(res.message);
            }
        }, () => {
            Message.error("接口请求错误");
        });
    }
}

/**
 * 获取类别列表
 * @return {类别列表}
 */
const getCategoryList = (params) => {
    return dispatch => {
        service.getCategoryList(params, (res) => {
            if(res.code === 0) {
                res.data.map((item) => item['text'] = item['value'] = item.name)
                dispatch(categoryList(res.data));
            } else {
                Message.error(res.message);
            }
        }, () => {
            Message.error("接口请求错误");
        });
    }
}

/**
 * 获取标签列表
 * @return {标签列表}
 */
const getTagList = (params) => {
    return dispatch => {
        service.getTagList(params, (res) => {
            if(res.code === 0) {
                res.data.map((item) => item['text'] = item['value'] = item.name)
                dispatch(tagList(res.data));
            } else {
                Message.error(res.message);
            }
        }, () => {
            Message.error('接口请求错误');
        });
    }
}

/**
 * 删除文章评论
 * @params {articleId} 文章id
 * @params {commentId} 评论id
 * @fn    成功回调
 */
const deleteComment = (params,fn) => {
    return dispatch => {
        service.deleteComment(params, (res) => {
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

export { operateArticle, getArticleList, getCategoryList, getTagList, deleteComment };