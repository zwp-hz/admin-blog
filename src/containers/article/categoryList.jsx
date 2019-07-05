import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getCategoryList, deleteTag } from "../../redux/action/articleAction";
import { Table, Button, Icon, Popconfirm } from "antd";
import BreadcrumbCustom from "../../component/BreadcrumbCustom";

class App extends Component {
  render() {
    const { categoryList, showDeleteConfirm } = this.props;

    const columns = [
      {
        title: "类型",
        dataIndex: "text",
        render: () => "分类"
      },
      {
        title: "内容",
        dataIndex: "name"
      },
      {
        title: "操作",
        render: (text, record, index) => (
          <span>
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={() => showDeleteConfirm(record._id, this, index)}
            >
              <Button>
                <Icon type="delete" />
              </Button>
            </Popconfirm>
          </span>
        )
      }
    ];

    return (
      <div id="categoryList">
        <BreadcrumbCustom
          breadcrumb={[
            {
              path: "/article/labelManage",
              breadcrumbName: "分类列表"
            }
          ]}
        />
        <Table
          rowKey="_id"
          columns={columns}
          pagination={false}
          dataSource={categoryList}
        />
      </div>
    );
  }
}

// 将 store 中的数据作为 props 绑定到 LoginForm 上
const mapStateToProps = (state, ownProps) => {
  let { categoryList } = state;

  return {
    categoryList
  };
};

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => {
  let actions = bindActionCreators({ getCategoryList, deleteTag }, dispatch);

  //初始化数据
  actions.getCategoryList();

  return {
    showDeleteConfirm(id, self, index) {
      let categoryList = self.props.categoryList;

      actions.deleteTag(
        {
          id: id,
          type: "category"
        },
        () => {
          categoryList.splice(index, 1);

          self.setState({
            categoryList: categoryList
          });
        }
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
