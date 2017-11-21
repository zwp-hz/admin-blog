/**
 * layoyt action
 * @return
 */

/**
 * 用于页面和区块的加载中状态
 * @return
 */
const loading = (loading) => {
    return {
        type: 'LOADING',
        loading
    }
}

/**
 * 用于记录菜单的缩放
 * @return
 */
const collapsed = (collapsed) => {
    return {
        type: 'COLLAPSED',
        collapsed
    }
}

export { loading, collapsed };