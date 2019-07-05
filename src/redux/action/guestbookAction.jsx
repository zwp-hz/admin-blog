/**
 * 公共 action
 * @return
 */
import { Message } from "antd";
import service from "../../services/service";

/**
 * 用于页面标签列表渲染
 * @return
 */
const guestbookList = data => {
  return {
    type: "GUESTBOOK_LIST",
    data
  };
};

/**
 * 删除留言
 * @param {Object} params - 请求参数
 * @param {Function} fn - 成功回调
 */
const deleteGuestbook = (params, fn) => {
  return dispatch => {
    service.deleteGuestbook(
      params,
      res => {
        if (res.code === 0) {
          Message.success(res.message);
          if (fn) fn();
        } else {
          Message.error(res.message);
        }
      },
      () => {
        Message.error("接口请求错误");
      }
    );
  };
};

/**
 * 获取留言列表
 */
const getGuestbook = params => {
  return dispatch => {
    service.getGuestbook(
      params,
      res => {
        if (res.code === 0) {
          dispatch(guestbookList(res.data));
        } else {
          Message.error(res.message);
        }
      },
      () => {
        Message.error("接口请求错误");
      }
    );
  };
};

export { deleteGuestbook, getGuestbook };
