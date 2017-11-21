import React, { Component } from 'react'; // 引入了React
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../../style/login.css';
import { goLogin } from '../../redux/action/loginAction';
import { Icon, Form, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

/* 以类的方式创建一个组件 */
class Login extends Component {
    /**
     * 在初始化渲染执行之后立刻调用一次，仅客户端有效（服务器端不会调用）。
     * 在生命周期中的这个时间点，组件拥有一个 DOM 展现，
     * 你可以通过 this.getDOMNode() 来获取相应 DOM 节点。
     */
	render() {
        const { loading, form, handleSubmit } = this.props;
        const getFieldDecorator = form.getFieldDecorator;

		return (
    		<div className="login-container g-c-center">
    			<div className="Login_Select">
                    <h1>登录</h1>
                </div>
    			<div className="login-form">
					<Form onSubmit={handleSubmit.bind(this,form)}>
				        <FormItem hasFeedback>
                            {getFieldDecorator('username', { initialValue: '', rules: [{ required: true, message: '用户名不能为空'}] })(
                                <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} size="large" placeholder="用户名" maxLength="20" />
                            )}
				        </FormItem>
				        <FormItem hasFeedback>
                            {getFieldDecorator('password', { rules: [{ required: true, message: '密码不能空' }] })(
                                <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} size="large" type="password" placeholder="密码" maxLength="20" />
                            )}
				        </FormItem>
                        <FormItem>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                        </FormItem>
				        <FormItem>
				            <Button type="primary" htmlType="submit" size="large" loading={loading}>{loading ? '登录中...' : '登录'}</Button>
				        </FormItem>
			        </Form>
    			</div>
    		</div>
		);
	}
}

const LoginForm = Form.create()(Login);

// 将 store 中的数据作为 props 绑定到 LoginForm 上
const mapStateToProps = (state, ownProps) => {
    let { loading } = state;

    return {
        loading
    }
}

// 将 action 作为 props 绑定到 Product 上。
const mapDispatchToProps = (dispatch, ownProps) => {
    let actions = bindActionCreators({ goLogin }, dispatch);

    return {
        handleSubmit: (form,e) => {
            e.preventDefault();
            form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    actions.goLogin({
                        username: values.username,
                        password: values.password  
                    });
                }
            });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
