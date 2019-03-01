import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Icon } from "antd";
import { Link } from "react-router";
const SubMenu = Menu.SubMenu;
/**
 * 公共菜单
 *
 * @export
 * @class Lmenu
 * @extends {Component}
 */
class Lmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openKey: this.props.path[1] ? this.props.path[0] : ""
    };
  }

  onSelect = data => {
    this.setState({
      openKey: data.pop()
    });
  };

  render() {
    const { collapsed, path } = this.props;

    return (
      <div style={{ width: 200 }}>
        <Menu
          mode="inline"
          theme="dark"
          openKeys={[this.state.openKey]}
          selectedKeys={[path[1] || path[0]]}
          inlineCollapsed={collapsed}
          onOpenChange={this.onSelect}
        >
          <Menu.Item key="index">
            <Link to="/index">
              <Icon type="home" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="user">
            <Link to="/user">
              <Icon type="user" />
              <span>用户</span>
            </Link>
          </Menu.Item>
          <Menu.Item key="qiniuManage">
            <Link to="/qiniuManage">
              <Icon type="folder" />
              <span>七牛资源管理</span>
            </Link>
          </Menu.Item>
          <SubMenu
            key="article"
            title={
              <span>
                <Icon type="file-text" />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="list">
              <Link to="/article/list">列表</Link>
            </Menu.Item>
            <Menu.Item key="categoryList">
              <Link to="/article/categoryList">分类列表</Link>
            </Menu.Item>
            <Menu.Item key="tagList">
              <Link to="/article/tagList">标签列表</Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="setting">
            <Link to="/setting">
              <Icon type="setting" />
              <span>设置</span>
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

// 将 store 中的数据作为 props 绑定到 LoginForm 上
const mapStateToProps = (state, ownProps) => {
  let { collapsed } = state;

  return {
    collapsed
  };
};

export default connect(mapStateToProps)(Lmenu);
