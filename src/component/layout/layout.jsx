import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { userInfo } from '../../redux/action/loginAction';
import { collapsed } from '../../redux/action/layoutAction';

// 公共头部
import Lheader from './lheader';
// 公共菜单
import Lmenu from './lmenu';
// 布局样式
import '../../style/layout.css';

import { Layout, Avatar, Tooltip } from 'antd';
const { Content, Sider } = Layout;

/**
 * (路由根目录组件，显示当前符合条件的组件)
 * 
 * @class Main
 * @extends {Component}
 */
class App extends Component {
	// 设置用户信息
	componentWillMount() {
		const { actions, location } = this.props;
        actions.userInfo(location.state);
    }

	render() {
		const { userInfo, collapsed, toggle } = this.props;
		const path = this.props.location.pathname.split('/').splice(1);

		// 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下
		return (
			<Layout className="layout">
		        <Sider collapsible collapsed={collapsed} onCollapse={toggle}>
		        	<div className="avatar-box g-c-center">
		        		<Tooltip placement="right" title={userInfo.username}>
		        			<Avatar size="large" icon="user" />
		        		</Tooltip>
		        	</div>
		        	<Lmenu path={path} />
		        </Sider>
		        <Layout>
		          	<Lheader />
		          	<Content className="layout-content">
		           		{this.props.children}
		          	</Content>
		        </Layout>
		    </Layout>
		);
	}
}

// 将 store 中的数据作为 props 绑定到 LoginForm 上
const mapStateToProps = (state, ownProps) => {
    let { userInfo, collapsed,  } = state;

    return {
    	userInfo,
        collapsed
    }
}

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => {
	let actions = bindActionCreators({ userInfo, collapsed }, dispatch);

	return {
		toggle: (collapsed) => {
			actions.collapsed(collapsed);
		},
		actions
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);