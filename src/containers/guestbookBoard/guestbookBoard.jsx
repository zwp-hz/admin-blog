import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  getGuestbook,
  deleteGuestbook
} from "../../redux/action/guestbookAction";
import { Table, Button, Icon, Popconfirm, Modal } from "antd";
import BreadcrumbCustom from "../../component/BreadcrumbCustom";
import common from "../../services/common";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      replys: []
    };
  }

  render() {
    const { guestbookList, showDeleteConfirm } = this.props;
    const { visible, replys } = this.state;

    const columns = [
      {
        title: "内容",
        dataIndex: "content",
        render: text => text.substring(0, 6) + (text.length > 6 ? "..." : "")
      },
      {
        title: "昵称",
        dataIndex: "user_name"
      },
      {
        title: "邮箱",
        dataIndex: "email"
      },
      {
        title: "城市",
        dataIndex: "city"
      },
      {
        title: "回复",
        dataIndex: "replys",
        sorter: (a, b) => a.replys.length - b.replys.length,
        render: (list, record) => (
          <a
            onClick={e =>
              this.setState({
                visible: true,
                replys: record.replys
              })
            }
          >
            {list.length}
          </a>
        )
      },
      {
        title: "时间",
        dataIndex: "creation_at",
        sorter: (a, b) => a.creation_at - b.creation_at,
        render: text => common.detaFormat(text, "YYYY-MM-DD")
      },
      {
        title: "操作",
        render: (text, record, index) => (
          <span>
            <Popconfirm
              title="确定要删除吗?"
              onConfirm={() =>
                showDeleteConfirm(record._id, this, index, "guestbookList")
              }
            >
              <Button>
                <Icon type="delete" />
              </Button>
            </Popconfirm>
          </span>
        )
      }
    ];

    const columns_replys = [
      {
        title: "内容",
        dataIndex: "content",
        render: text => text.substring(0, 6) + (text.length > 6 ? "..." : "")
      },
      {
        title: "昵称",
        dataIndex: "user_name"
      },
      {
        title: "邮箱",
        dataIndex: "email"
      },
      {
        title: "城市",
        dataIndex: "city"
      },
      {
        title: "时间",
        dataIndex: "creation_at",
        sorter: (a, b) => a.creation_at - b.creation_at,
        render: text => common.detaFormat(text, "YYYY-MM-DD")
      },
      {
        title: "操作",
        render: (text, record, index) => (
          <Popconfirm
            title="确定要删除吗?"
            onConfirm={() =>
              showDeleteConfirm(record._id, this, index, "replys")
            }
          >
            <Button>
              <Icon type="delete" />
            </Button>
          </Popconfirm>
        )
      }
    ];

    return (
      <div id="tagList">
        <BreadcrumbCustom
          breadcrumb={[
            {
              path: "",
              breadcrumbName: "留言板"
            }
          ]}
        />
        <Table
          rowKey="_id"
          columns={columns}
          pagination={false}
          expandedRowRender={record => (
            <p style={{ margin: 0, textAlign: "left", textIndent: "2em" }}>
              {record.content}
            </p>
          )}
          dataSource={guestbookList}
        />
        <Modal
          title="回复列表"
          width="60%"
          visible={visible}
          onOk={() => this.setState({ visible: false })}
          onCancel={() => this.setState({ visible: false })}
        >
          <Table
            rowKey="_id"
            pagination={{ pageSize: 5 }}
            columns={columns_replys}
            expandedRowRender={record => (
              <p style={{ margin: 0, textAlign: "left", textIndent: "2em" }}>
                {record.content}
              </p>
            )}
            dataSource={replys}
          />
        </Modal>
      </div>
    );
  }
}

// 将 store 中的数据作为 props 绑定到 LoginForm 上
const mapStateToProps = (state, ownProps) => {
  let { guestbookList } = state;

  return {
    guestbookList
  };
};

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => {
  let actions = bindActionCreators({ getGuestbook, deleteGuestbook }, dispatch);

  //初始化数据
  actions.getGuestbook();

  return {
    showDeleteConfirm(id, self, index, type) {
      let list = self[type === "replys" ? "state" : "props"][type];

      actions.deleteGuestbook(
        {
          id: id
        },
        () => {
          list.splice(index, 1);

          self.setState({
            [type]: list
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
