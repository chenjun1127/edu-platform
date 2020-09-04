import React, { useContext } from 'react';
import { Form, Input, Button, message } from 'antd';
import { withRouter } from 'react-router-dom';
import { sendPasswordEmail } from '../../api/base';
import { AppContext } from '../../hooks/context';
const FindPassword = (props) => {
  const { dispatch } = useContext(AppContext);
  const toHome = () => {
    localStorage.clear();
    dispatch({ type: 'operate', data: { status: 0, visible: false, title: '登录', width: 400 } });
    props.history.replace('/');
  };
  const onFinish = (values) => {
    const { name, email } = values;
    const url = window.location.origin + '/password/reset';
    sendPasswordEmail({ name, email, url }).then((res) => {
      if (res.data.code === 0) {
        props.history.push(`/password/link?name=${name}&email=${email}`);
      } else {
        message.info(res.data.msg);
      }
    });
  };

  return (
    <div className="bg-gray">
      <div className="card">
        <h1 className="card-title">
          <em>找回密码</em> <span onClick={toHome}>回到首页</span>
        </h1>
        <div className="card-content">
          <Form onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Form.Item label="用户名" name="name" rules={[{ required: true, message: '请输入用户名！' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                { required: true, message: '请输入邮箱！' },
                { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确邮箱！' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
              <Button type="primary" htmlType="submit">
                下一步
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default withRouter(FindPassword);
