/**
 * 文章列表
 * @return
 */
const articleList = (state = {}, action) => {
	switch(action.type) {
		case 'ARTICLE_LIST':
			return action.data;
		default:
			return state;
	}
}

/**
 * 类别列表
 * @return
 */
const categoryList = (state = [], action) => {
	switch(action.type) {
		case 'CATEGORY_LIST':
			return action.data;
		default:
			return state;
	}
}

/**
 * 标签列表
 * @return
 */
const tagList = (state = [], action) => {
	switch(action.type) {
		case 'TAG_LIST':
			return action.data;
		default:
			return state;
	}
}

export { articleList, categoryList, tagList };