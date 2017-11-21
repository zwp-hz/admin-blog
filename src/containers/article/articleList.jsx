import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { operateArticle, getArticleList } from '../../redux/action/indexAction';
import { Modal, Table, Pagination, Button, Icon } from 'antd';
import BreadcrumbCustom from '../../component/BreadcrumbCustom';
import Public from '../../services/public';
const confirm = Modal.confirm;

class App extends Component {
  	render() {
  		const { loading, articleList, onChange, showDeleteConfirm } = this.props;

  		const columns = [{
		  	title: '标题',
		  	dataIndex: 'title'
		}, {
		  	title: '分类',
		  	dataIndex: 'categories',
		  	render: text => text.join('，')
		}, {
		  	title: '标签',
		  	dataIndex: 'tags',
		  	render: text => text.join('，')
		}, {
		  	title: '浏览量',
		  	dataIndex: 'browsing',
		  	sorter: (a, b) => a.browsing - b.browsing
		}, {
		  	title: '创建时间',
		  	dataIndex: 'creation_at',
		  	sorter: (a, b) => a.creation_at - b.creation_at,
		  	render: text => Public.detaFormat(text,'YYYY-MM-DD')
		}, {
		  	title: '更改时间',
		  	dataIndex: 'update_at',
		  	sorter: (a, b) => a.update_at - b.update_at,
		  	render: text => Public.detaFormat(text,'YYYY-MM-DD')
		}, {
		  	title: '状态',
		  	dataIndex: 'release',
		  	render: text => text ? '发布' : '草稿'
		},{
			title: '操作',
			render: (text, record) => (
				<span>
					<Link to={"/article/edit?id="+record._id+""}><Button><Icon type="edit" /></Button></Link>
					<Button onClick={() => showDeleteConfirm(record._id)}><Icon type="delete" /></Button>
				</span>
			)
		}]

	    return (
	    	<div id="articleList">
	    		<BreadcrumbCustom 
	    		  breadcrumb={[{
	    		  	  path: '/article/list', 
	    		  	  breadcrumbName: '文章列表'
	    		    }	    		  
	    		  ]}
	    		/>
	    		<div className="actionBox">
	    			<Button type="primary"><Link to="/article/edit">新增</Link></Button>
	    		</div>
	    		<Table rowKey="_id" loading={loading} pagination={false} columns={columns} dataSource={articleList.data} />
	      		<Pagination onChange={onChange} total={articleList.countNum} />
	    	</div>
	    );
  	}
}

// 将 store 中的数据作为 props 绑定到 LoginForm 上
const mapStateToProps = (state, ownProps) => {
    let { loading, articleList } = state;

    return {
        loading,
        articleList
    }
}

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => {
	let actions = bindActionCreators({ operateArticle, getArticleList }, dispatch);

	//初始化数据
	actions.getArticleList({
    	categories: '全部',
    	page: 1
    });

	return {
		onChange: (page) => {
			actions.getArticleList({
		    	categories: '全部',
		    	page: page
		    });
		},
		showDeleteConfirm(id) {
		  	confirm({
			    title: '删除文章',
			    content: '是否删除？',
			    okText: '确定',
			    okType: 'danger',
			    cancelText: '取消',
			    onOk() {
			     	actions.operateArticle({
			     		_id: id,
			     		type: 'remove'
			     	})
			    }
		  	});
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);