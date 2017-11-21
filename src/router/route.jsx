import React, {Component} from 'react';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import service from '../services/service';
import { Message } from 'antd';
import layout from '../component/layout/layout';
import login from '../containers/login/login';

/**
 * (路由根目录组件，显示当前符合条件的组件)
 * 
 * @class Roots
 * @extends {Component}
 */
class Roots extends Component {
	render() {
		return (
			<div>{this.props.children}</div>
		);
	}
}

// 首页
const index = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/index/index').default)
    }, 'index');
}

// 文章列表
const articleList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/article/articleList').default)
    }, 'articleList');
}

// 文章编辑
const articleEdit = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('../containers/article/articleEdit').default)
    }, 'articleEdit');
}

// 登录验证.  闭包中请添加next
const requireAuth = (nextState, replace, next) => {	
	service.isLogin({}, (res) => {
       	if (res.code !== 0) {
       		replace({pathname: '/login'});
       		next();
       	} else {
       		nextState.location.state = res.data;
       		next();
       	}
    }, () => {
        Message.error('接口请求错误');
    });
}

const RouteConfig = (
	<Router history={browserHistory}>
		<Route path="/index" component={layout}>
			<IndexRoute name="首页" getComponent={index} onEnter={requireAuth} />
			<Route name="文章列表" path="/article/list" getComponent={articleList} onEnter={requireAuth} />
			<Route path="/article/edit" getComponent={articleEdit} onEnter={requireAuth} />
		</Route>
		<Route path="/login" component={Roots}>
			<IndexRoute component={login} />
		</Route>
		<Redirect from="*" to="/index" />
	</Router>
);

export default RouteConfig;