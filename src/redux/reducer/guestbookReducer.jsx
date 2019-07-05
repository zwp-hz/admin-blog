/**
 * 标签列表
 * @return
 */
const guestbookList = (state = [], action) => {
  switch (action.type) {
    case "GUESTBOOK_LIST":
      return action.data;
    default:
      return state;
  }
};

export { guestbookList };
