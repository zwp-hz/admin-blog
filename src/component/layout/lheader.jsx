import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router";
import { collapsed } from "../../redux/action/layoutAction";
import { Layout, Icon, Badge, Tooltip } from "antd";
const { Header } = Layout;

/**
 * 公共头部
 *
 * @export
 * @class Lheader
 * @extends {Component}
 */
class Lheader extends Component {
  render() {
    const { collapsed, toggle } = this.props;
    return (
      <Header className="layout-header">
        <Icon
          className="trigger"
          type={collapsed ? "menu-unfold" : "menu-fold"}
          onClick={toggle.bind(this, collapsed)}
        />
        <div className="notification">
          <Badge count={1}>
            <Link to="#">
              <Icon type="notification" />
            </Link>
          </Badge>
          <Tooltip placement="bottom" title="退出登录">
            <Link
              to="/login"
              onClick={() => {
                sessionStorage.token = "";
              }}
            >
              <Icon type="logout" />
            </Link>
          </Tooltip>
        </div>
      </Header>
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

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => {
  let actions = bindActionCreators({ collapsed }, dispatch);

  return {
    toggle: collapsed => {
      actions.collapsed(!collapsed);
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lheader);
