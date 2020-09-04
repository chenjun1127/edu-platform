import React, { useContext, useState ,useRef} from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { UserOutlined, LockOutlined, SafetyOutlined, MailOutlined } from '@ant-design/icons';
import { AppContext } from '../hooks/context';
import { register } from '../api/base';
import { withRouter } from 'react-router-dom';

const RegisterForm = (props) => {
  const { dispatch } = useContext(AppContext);
  const [verifyCodeUrl, setVerifyCodeUrl] = useState(`http://localhost:6180/edu-platform/api/v1/getVerifyCode?t=${Date.now()}`);
  const registerForm = useRef();
  const onFinish = (values) => {
    register({ name: values.username, password: values.password, verifyCode: values.captcha, email: values.email }).then((res) => {
      if (res.data.code === 0) {
        props.history.push({ pathname: '/active', query: { name: values.username, email: values.email, url: window.location.href } });
      } else {
        message.info(res.data.msg);
        registerForm.current.resetFields();
        changeUrl();
      }
    });
  };
  const toggleModal = () => {
    if (props.location.pathname === '/register') {
      props.history.push('/login');
    } else {
      dispatch({ type: 'operate', data: { status: 0, visible: true, title: '登录', width: 400 } });
    }
  };
  const changeUrl = () => {
    setVerifyCodeUrl(`http://localhost:6180/edu-platform/api/v1/getVerifyCode?t=${Date.now()}`);
  };
  return (
    <Form size="large" className="login-form app-main-form" initialValues={{ remember: true }} onFinish={onFinish} ref={registerForm}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: '请输入密码' },
          { pattern: /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,}/, message: '请输入6位以上密码（字母数字组合）' },
        ]}
      >
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={['password']}
        rules={[
          { required: true, message: '请输入密码' },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('两次密码输入不一致');
            },
          }),
        ]}
      >
        <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: '请输入邮箱' },
          { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确邮箱' },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} type="email" placeholder="邮箱" />
      </Form.Item>
      <Form.Item>
        <Row gutter={16}>
          <Col span={15}>
            <Form.Item name="captcha" noStyle rules={[{ required: true, message: '请输入验证码' }]}>
              <Input prefix={<SafetyOutlined className="site-form-item-icon" />} maxLength={4} placeholder="验证码" />
            </Form.Item>
          </Col>
          <Col span={9}>
            <img src={verifyCodeUrl} alt="" onClick={changeUrl} height="40" />
          </Col>
        </Row>
      </Form.Item>

      <Form.Item>
        <Button type="primary" block htmlType="submit" className="login-form-button">
          注册
        </Button>
      </Form.Item>
      <Form.Item>
        <Row justify="end">
          <span>已有账号？</span>
          <em onClick={toggleModal}>立即登录</em>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default withRouter(RegisterForm);
