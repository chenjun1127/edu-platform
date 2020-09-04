import React, { useEffect, useState } from 'react';
import { Alert, Button, message } from 'antd';
import { withRouter, Redirect } from 'react-router-dom';
import { sendActiveEmail, activeAccount } from '../../api/base';
import { Input } from 'antd';
import goToEmail from '../../assets/js/email';
const Active = (props) => {
  const [emailVerifyCode, setEmailVerifyCode] = useState('');
  useEffect(() => {
    const sendEmial = () => {
      if (!props.location.query) {
        localStorage.clear();
        props.history.replace('/');
      } else {
        const { name, email, url } = props.location.query;
        sendActiveEmail({ name, email, url }).then((res) => {
          if (res.data.code !== 0) {
            props.history.push('/fail?type=0');
          }
        });
      }
    };
    sendEmial();
  }, [props.history, props.location.query]);
  const handleActiveAccount = () => {
    if (!emailVerifyCode.trim()) {
      message.info('请输入激活验证码');
      return;
    }
    activeAccount({ name: props.location.query.name, verifyCode: emailVerifyCode }).then((res) => {
      if (res.data.code === 0) {
        props.history.push('/success?type=1');
      } else {
        message.info(res.data.msg);
      }
    });
  };
  const handleChange = (e) => {
    setEmailVerifyCode(e.target.value);
  };
  const toHome = () => {
    localStorage.clear();
    props.history.replace('/');
  };
  const toEmail = (email) => {
    window.open('//' + goToEmail(email.split('@')[1]));
  };
  if (!props.location.query) {
    return <Redirect to="/" />;
  }
  return (
    <div className="bg-gray">
      <div className="card">
        <h1 className="card-title">请激活账号</h1>
        <div className="card-content">
          <Alert description="为了保障您账户的正常使用，请激活您的账号！" type="warning" />
          <div className="forgot-tips">
            <div className="active-email">
              <p>
                您的 Email：<em onClick={() => toEmail(props.location.query.email)}> {props.location.query.email} </em>
              </p>
              <p>
                激活邮件已发送，请<em onClick={() => toEmail(props.location.query.email)}> 前往邮箱 </em>注意查收（注意检查回收站、垃圾箱中是否有激活邮件）。如果仍未收到，请联系我们 402074940@qq.com。
              </p>
              <div className="active-input">
                <span>激活验证码：</span>
                <Input name="emailVerifyCode" maxLength={4} value={emailVerifyCode} placeholder="验证码" onChange={handleChange}></Input>
              </div>
            </div>
            <div>
              <Button type="primary" block className="forgot-button" htmlType="button" onClick={handleActiveAccount}>
                立即激活
              </Button>
              <Button block onClick={toHome}>
                回到首页
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(Active);
