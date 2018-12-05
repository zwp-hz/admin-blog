import $ from 'n-zepto';

const target = 'http://www.zhuweipeng.top:89';

console.log(process.env.NODE_ENV)

/**
 * $ajax
 * @url     请求的地址
 * @type    数据的提交方式
 * @params  请求的数据
 * @success 请求成功后的回调
 * @fail    请求失败后的回调
 */
const ajaxFn = (url, type, params, success, fail) => {
    $.ajax({
        url: target + url,
        type: type,
        dataType: type === 'GET' ? 'jsonp' : 'json',
        crossDomain: true,
        xhrFields: {
            withCredentials: true
        },
        data: params,
        success: function(res) {
            if (success) success(res);
        },
        error: function() {
            if (fail) fail();
        }
    })
}

class service {
    /**
     * 登录
     */
    goLogin(params, success, fail) {
        ajaxFn('/api/login','POST',params,success,fail);
    }

    /**
     * 登录验证
     */
    isLogin(params, success, fail) {
        ajaxFn('/api/isLogin','POST',params,success,fail);
    }

    /**
     * 文章操作
     */
    operateArticle(params, success, fail) {
        ajaxFn('/api/operateArticles','POST',params,success,fail);
    }

    /**
     * 获取文章列表
     */
    getArticleList(params, success, fail) {
        ajaxFn('/api/getArticlesList','POST',params,success,fail);
    }

    /**
     * 获取文章详情
     */
    getArticleDetail(params, success, fail) {
        ajaxFn('/api/getArticlesDetail','POST',params,success,fail);
    }

    /**
     * 获取类别
     */
    getCategoryList(params, success, fail) {
        ajaxFn('/api/getCategoryList','POST',params,success,fail);
    }

    /**
     * 获取标签
     */
    getTagList(params, success, fail) {
        ajaxFn('/api/getTagsList','POST',params,success,fail);
    }

    /**
     * 删除评论
     */
    deleteComment(params, success, fail) {
        ajaxFn('/api/deleteComment','POST',params,success,fail);
    }

    /**
     * 获取七牛资源列表
     */
    getQiniuList(params, success, fail) {
        ajaxFn('/api/getQiniuList','POST',params,success,fail);
    }

    /**
     * 删除七牛对应空间文件
     */
    delete_qiniu(params, success, fail) {
        ajaxFn('/api/delete_qiniu','POST',params,success,fail);
    }
}

// 实例化再导出
export default new service();