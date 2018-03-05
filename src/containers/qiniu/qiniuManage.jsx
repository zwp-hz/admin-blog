import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getQiniuList, delete_qiniu } from '../../redux/action/qiniuAction';
import { Modal, Table, Button, Icon, Popconfirm, Upload, message } from 'antd';
import BreadcrumbCustom from '../../component/BreadcrumbCustom';
import common from '../../services/common';
const imgHost = 'http://image.zhuweipeng.me/';

class App extends Component {
	constructor(props) {
        super(props);
        this.state = {
        	breadcrumbs: [{						// 面包屑列表
				path: '/qiniuManage',
				breadcrumbName: '七牛资源管理'
			}],
        	previewVisible: false,              // 对话框状态
            previewImage: ''       	            // 图片地址
        }
    }

    // 初始化数据
    componentWillMount() {
		const { actions } = this.props;
		actions.getQiniuList({
			type: true
		});
    }

	// 关闭对话框
    handleCancel = (e) => {
        this.setState({ previewVisible: false });
    }

    // 面包屑目录更改
    changeBreadcrumb = (val) => {
    	const { changeFloader } = this.props;

    	changeFloader(val,this,'delete');
    }

    // 上传文件改变时
    handleUploadChange = (info) => {
    	if (info.file.status === 'done') {
		    message.success('上传成功',0.5 , () => {
		    	const { actions } = this.props;
		    	let prefix = '';

		    	for (let i of this.state.breadcrumbs) {
					prefix += i.breadcrumbName === '七牛资源管理' ? '' : i.breadcrumbName;
				}

				actions.getQiniuList({
					type: true,
					prefix: prefix
				});
		    });
	    } else if (info.file.status === 'error') {
	      	message.error('上传失败');
	    }
    }

  	render() {
  		const { loading, qiniuList, changeFloader, showDeleteConfirm } = this.props;
  		const { breadcrumbs, previewVisible, previewImage } = this.state;

  		const columns = [{
		  	title: '文件名',
		  	dataIndex: 'img_name'
		},{
		  	title: '文件类型',
		  	dataIndex: 'mimeType'
		},{
			title: '文件大小',
			dataIndex: 'fsize',
			sorter: (a,b) => a.fsize - b.fsize,
			render: text => {
				if (text === 0) return '0b';

			    let k = 1024,
			        sizes = ['b', 'kb', 'mb', 'gb', 'tb'],
			        i = Math.floor(Math.log(text) / Math.log(k));
			 
			   return (text / Math.pow(k, i)).toPrecision(3) + sizes[i];
			}
		},{
		  	title: '上传时间',
		  	dataIndex: 'putTime',
		  	sorter: (a, b) => a.putTime - b.putTime,
		  	render: text => common.detaFormat(parseInt(text/10000,10),'YYYY-MM-DD hh:mm:ss')
		},{
			title: '操作',
			render: (text, record, index) => (
				<span>
					<Button onClick={() => this.setState({previewVisible: true,previewImage : record.key})}><Icon type="eye" /></Button>
					<Popconfirm title="确定要删除吗?" onConfirm={() => showDeleteConfirm(record.key,index,this)}>
		              	<Button><Icon type="delete" /></Button>
		            </Popconfirm>
				</span>
			)
		}];

		let floders = (data) => {
			let res = [];

			if (data) {
				for (let item of data) {
					res.push(<Button onClick={ () => changeFloader(item,this) } key={item}>{item}</Button>);
				}
			}

			return res;
		};

	    return (
	    	<div id="articleList">
	    		<BreadcrumbCustom
	    		  breadcrumb={breadcrumbs}
	    		  changeBreadcrumb={this.changeBreadcrumb}
	    		/>
	    		<div className="actionBox clear">
	    			{floders(qiniuList.commonPrefixes)}
	    			<Upload
	    			  multiple={true}
	    			  showUploadList={false}
	    			  accept="image/*"
	    			  action="http://localhost:8989/api/upload"
					  onChange={this.handleUploadChange}
					>
				    	<Button type="primary">
				      		<Icon type="upload" />上传
				    	</Button>
				  	</Upload>
	    		</div>
	    		<Table rowKey="key" loading={loading} columns={columns} dataSource={qiniuList.items} />
	    		<Modal 
	    		  visible={previewVisible} 
	    		  closable={false} 
	    		  destroyOnClose={true} 
	    		  footer={null} 
	    		  onCancel={this.handleCancel}
	    		>
                    <img alt="example" style={{ width: '100%' }} src={imgHost + previewImage} />
                </Modal>
	    	</div>
	    );
  	}
}

// 将 store 中的数据作为 props 绑定到 LoginForm 上
const mapStateToProps = (state, ownProps) => {
    let { loading, qiniuList } = state;

    return {
        loading,
        qiniuList
    }
}

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => {
	let actions = bindActionCreators({ getQiniuList, delete_qiniu }, dispatch);

	return {
		actions,
		/**
		 * 切换文件目录
		 * text	    		文件前缀
		 * self	    		this
		 * type	    		区分面包屑数组追加还是删除数据，默认为‘push’。 可选‘delete’ 
		 */
		changeFloader: (text,self,type) => {
			let breadcrumbs = self.state.breadcrumbs,
				prefix = '';

			// 删除后面的导航
			if (type === 'delete') {
				for (let i = breadcrumbs.length - 1; i > 0; i--) {
					let name = breadcrumbs[i].breadcrumbName;

					if (name !== text) {
						breadcrumbs.splice(i,1);
					} else if (name === text) {
						break;
					}
				}
			}
			
			for (let i of breadcrumbs) {
				prefix += i.breadcrumbName === '七牛资源管理' ? '' : i.breadcrumbName;
			}

			actions.getQiniuList({
				type: true,
				prefix: prefix + (type === 'delete' ? '' : text)
			}, () => {
				if (type !== 'delete') {
					breadcrumbs.push({
						path: '/qiniuManage',
						breadcrumbName: text
					});
				}

				self.setState({breadcrumbs: breadcrumbs});
			});
		},
		showDeleteConfirm(key,index,self) {
			actions.delete_qiniu({
				key: key
			},() => {
				let qiniuList = self.props.qiniuList;
				qiniuList.items.splice(index,1);

				self.setState({qiniuList: qiniuList});
			});
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);