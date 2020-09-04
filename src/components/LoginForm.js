import React, { useContext } from 'react';
import { Form, Input, Button, Checkbox, Row, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AppContext } from '../hooks/context';
import { login } from '../api/base';
import { withRouter, Link } from 'react-router-dom';
const LoginForm = (props) => {
  const { dispatch } = useContext(AppContext);

  const onFinish = (values) => {
    login({ name: values.username, password: values.password }).then((res) => {
      if (res.data.code === 0) {
        const { userInfo, token } = res.data.data;
        dispatch({ type: 'login', userInfo: userInfo });
        if (props.location.pathname === '/login') {
          props.history.replace('/');
        } else {
          dispatch({ type: 'operate', data: { status: 0, visible: false } });
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        localStorage.setItem('token', token);
        if (userInfo.status === 0) {
          props.history.push({ pathname: '/active', query: { name: userInfo.name, email: userInfo.email, url: window.location.href } });
        }
      } else {
        message.info(res.data.msg);
      }
    });
  };
  const toggleModal = () => {
    if (props.location.pathname === '/login') {
      props.history.push('/register');
    } else {
      dispatch({ type: 'operate', data: { status: 1, visible: true, title: '注册', width: 400 } });
    }
  };

  return (
    <Form size="large" className="login-form app-main-form" initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <Row justify="space-between">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>记住密码</Checkbox>
          </Form.Item>
          <em className="login-form-forgot">
            <Link to="/password">忘记密码？</Link>
          </em>
        </Row>
      </Form.Item>
      <Form.Item>
        <Button type="primary" block htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
      <Form.Item>
        <Row justify="end">
          <span>还没有账号？</span>
          <em onClick={toggleModal}>立即注册</em>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default withRouter(LoginForm);
