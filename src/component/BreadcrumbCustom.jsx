import React, { Component } from 'react';
import { Link } from 'react-router';
import { Breadcrumb } from 'antd';

/**
 * 面包屑
 */
export default class BreadcrumbCustom extends Component {
	render() {
		const { breadcrumb } = this.props;

		let routes = [
			{
				path: '/index',
				breadcrumbName: '首页'
			},
			...breadcrumb
		];

		const itemRender = (route, params, routes, paths) => {
		  	const last = routes.indexOf(route) === routes.length - 1;
		  	return last ? <span>{route.breadcrumbName}</span> : <Link to={route.path}>{route.breadcrumbName}</Link>;
		}

		return (
			<Breadcrumb itemRender={itemRender} routes={routes}/>
		)
	}
}