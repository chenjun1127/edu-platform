import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { getLinkStatus, updatePassword } from '../../api/base';
const ResetPassword = (props) => {
  const { search } = props.location;
  const paramsString = search.substr(1);
  const searchParams = new URLSearchParams(paramsString);
  const id = parseInt(searchParams.get('id'));
  useEffect(() => {
    const linkStatus = () => {
      getLinkStatus({ params: { id } }).then((res) => {
        if (res.data.code !== 0) {
          props.history.replace('/fail?type=2');
        }
      });
    };
    linkStatus();
  }, [id, props.history]);

  const toHome = () => {
    localStorage.clear();
    props.history.replace('/');
  };
  const onFinish = (values) => {
    const { password } = values;
    updatePassword({ id, password }).then((res) => {
      if (res.data.code === 0) {
        props.history.push(`/success?type=1`);
      } else {
        message.info(res.data.msg);
      }
    });
  };

  return (
    <div className="bg-gray">
      <div className="card">
        <h1 className="card-title">
          <em>重置密码</em> <span onClick={toHome}>回到首页</span>
        </h1>
        <div className="card-content">
          <Form onFinish={onFinish} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
            <Form.Item
              label="新密码"
              name="password"
              rules={[
                { required: true, message: '请输入密码' },
                { pattern: /(?!^\\d+$)(?!^[a-zA-Z]+$)(?!^[_#@]+$).{6,}/, message: '请输入6位以上密码（字母数字组合）' },
              ]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              label="确认新密码"
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
              <Input type="password" />
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
export default withRouter(ResetPassword);
