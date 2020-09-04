import React from 'react';
import { withRouter } from 'react-router-dom';
import goToEmail from '../../assets/js/email';
const PasswordLink = (props) => {
  const { search } = props.location;
  const paramsString = search.substr(1);
  const searchParams = new URLSearchParams(paramsString);
  const email = searchParams.get('email');
  const name = searchParams.get('name');
  const toHome = () => {
    localStorage.clear();
    props.history.replace('/');
  };
  const toEmail = (email) => {
    window.open('//' + goToEmail(email.split('@')[1]));
  };
  return (
    <div className="bg-gray">
      <div className="card">
        <h1 className="card-title">
          <em>找回密码</em> <span onClick={toHome}>回到首页</span>
        </h1>
        <div className="card-content">
          <div className="forgot-tips">
            <div className="active-email" style={{paddingTop:0}}>
              <p>
                亲爱的用户 <em>{name}</em>，我们发送了一封邮件到您的邮箱：<em onClick={() => toEmail(email)}>{email}</em>，请及时查看（半小时内有效）。如果仍未收到，请联系我们<em>402074940@qq.com</em>。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default withRouter(PasswordLink);
