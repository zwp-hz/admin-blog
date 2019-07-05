import $ from "n-zepto";

const target =
  process.env.NODE_ENV === "production"
    ? "http://www.zhuweipeng.top:89"
    : "http://localhost:8989";

/**
 * $ajax
 * @param {url}     请求的地址
 * @param {params}  请求的数据
 * @param {success} 请求成功后的回调
 * @param {fail}    请求失败后的回调
 */
const ajaxFn = (url, params, success, fail) => {
  $.ajax({
    url: target + url,
    type: "POST",
    dataType: "json",
    data: params,
    success: function(res) {
      if (success) success(res);
    },
    error: function() {
      if (fail) fail();
    }
  });
};

class service {
  /**
   * 登录
   */
  goLogin(params, success, fail) {
    ajaxFn("/api/login", params, success, fail);
  }

  /**
   * 登录验证
   */
  isLogin(params, success, fail) {
    ajaxFn("/api/isLogin", params, success, fail);
  }

  /**
   * 文章操作
   */
  operateArticle(params, success, fail) {
    ajaxFn("/api/operateArticles", params, success, fail);
  }

  /**
   * 获取文章列表
   */
  getArticleList(params, success, fail) {
    ajaxFn("/api/getArticlesList", params, success, fail);
  }

  /**
   * 获取文章详情
   */
  getArticleDetail(params, success, fail) {
    ajaxFn("/api/getArticlesDetail", params, success, fail);
  }

  /**
   * 获取类别
   */
  getCategoryList(params, success, fail) {
    ajaxFn("/api/getCategoryList", params, success, fail);
  }

  /**
   * 获取标签
   */
  getTagList(params, success, fail) {
    ajaxFn("/api/getTagsList", params, success, fail);
  }

  /**
   * 删除标签
   */
  deleteTag(params, success, fail) {
    ajaxFn("/api/deleteTag", params, success, fail);
  }

  /**
   * 删除评论
   */
  deleteComment(params, success, fail) {
    ajaxFn("/api/deleteComment", params, success, fail);
  }

  /**
   * 获取七牛资源列表
   */
  getQiniuList(params, success, fail) {
    ajaxFn("/api/getQiniuList", params, success, fail);
  }

  /**
   * 删除七牛对应空间文件
   */
  delete_qiniu(params, success, fail) {
    ajaxFn("/api/delete_qiniu", params, success, fail);
  }

  /**
   * 获取留言列表
   */
  getGuestbook(params, success, fail) {
    ajaxFn("/api/getGuestbookList", params, success, fail);
  }

  /**
   * 删除留言
   */
  deleteGuestbook(params, success, fail) {
    ajaxFn("/api/deleteGuestbook", params, success, fail);
  }
}

// 实例化再导出
export default new service();
