import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { operateArticle, getArticleList, deleteComment } from '../../redux/action/indexAction';
import { Modal, Table, Pagination, Button, Icon, Popconfirm } from 'antd';
import BreadcrumbCustom from '../../component/BreadcrumbCustom';
import common from '../../services/common';

class App extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	visible: false,
        	active_article: {
        		review: []
        	}
        }
    }

  	render() {
  		const { loading, articleList, onChange, showDeleteConfirm } = this.props;
  		const { visible, active_article } = this.state;

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
		  	title: '评论',
		  	dataIndex: 'review',
		  	sorter: (a, b) => a.review.length - b.review.length,
		  	render: (text, record) => <a onClick={(e) => this.setState({
		  		visible: true,
		  		active_article: record
		  	})}>{text.length}</a>
		}, {
		  	title: '创建时间',
		  	dataIndex: 'creation_at',
		  	sorter: (a, b) => a.creation_at - b.creation_at,
		  	render: text => common.detaFormat(text,'YYYY-MM-DD')
		}, {
		  	title: '更改时间',
		  	dataIndex: 'update_at',
		  	sorter: (a, b) => a.update_at - b.update_at,
		  	render: text => common.detaFormat(text,'YYYY-MM-DD')
		}, {
		  	title: '状态',
		  	dataIndex: 'release',
		  	render: text => text ? '发布' : '草稿'
		},{
			title: '操作',
			render: (text, record) => (
				<span>
					<Link to={"/article/edit?id="+record._id+""}><Button><Icon type="edit" /></Button></Link>
					<Popconfirm title="确定要删除吗?" onConfirm={() => showDeleteConfirm(record._id,'article')}>
		              	<Button><Icon type="delete" /></Button>
		            </Popconfirm>
				</span>
			)
		}];

		const columns_review = [{
			title: '内容',
			dataIndex: 'content',
			render: text => text.substring(0,6) + (text.length > 6 ? '...' : '')
		},{
			title: '城市',
			dataIndex: 'city'
		},{
			title: 'IP',
			dataIndex: 'ip'
		},{
			title: '邮箱',
			dataIndex: "email",
			render: text => text || '匿名'
		},{
			title: '评论时间',
			dataIndex: 'creation_at',
			sorter: (a, b) => a.creation_at - b.creation_at,
		  	render: text => common.detaFormat(text,'YYYY-MM-DD')
		},{
			title: '操作',
			render: (text, record, index) => (
				<Popconfirm title="确定要删除吗?" onConfirm={() => showDeleteConfirm(record._id,'comment',this,index)}>
	              	<Button><Icon type="delete" /></Button>
	            </Popconfirm>
			)
		}];

	    return (
	    	<div id="articleList">
	    		<BreadcrumbCustom
	    		  breadcrumb={[{
	    		  	  path: '/article/list',
	    		  	  breadcrumbName: '文章列表'
	    		    }	    		  
	    		  ]}
	    		/>
	    		<div className="actionBox clear">
	    			<Button type="primary"><Link to="/article/edit">新增</Link></Button>
	    		</div>
	    		<Table rowKey="_id" loading={loading} pagination={false} columns={columns} dataSource={articleList.data} />
	      		<Pagination onChange={onChange} total={articleList.countNum} />
	      		<Modal
		          title="评论列表"
		          width="60%"
		          visible={visible}
		          onOk={() => this.setState({visible: false})}
          		  onCancel={() => this.setState({visible: false})}
		        >
		        	<Table 
		        	  rowKey="_id"
		        	  pagination={{ pageSize: 5 }}
		        	  columns={columns_review}
		        	  expandedRowRender={record => <p style={{ margin: 0, textAlign: 'left', textIndent: '2em' }}>{record.content}</p>}
		        	  dataSource={active_article.review}/>
		        </Modal>
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
	let actions = bindActionCreators({ operateArticle, getArticleList, deleteComment }, dispatch);

	//初始化数据
	actions.getArticleList({
    	categories: '全部',
    	page: 1,
    	type: 'edit'
    });

	return {
		onChange: (page) => {
			actions.getArticleList({
		    	categories: '全部',
		    	page: page,
		    	type: 'edit'
		    });
		},
		showDeleteConfirm(id,type,self,index) {
			let article = self.state.active_article;

	    	if (type === 'article') {
	    		actions.operateArticle({
		     		_id: id,
		     		type: 'remove'
		     	});
	    	} else if (type === 'comment') {
	    		actions.deleteComment({
	    			articleId: article._id,
	    			commentId: id
	    		}, () => {
	    			article.review.splice(index,1);

	    			self.setState({
	    				active_article: article
	    			})
	    		});
	    	}
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);