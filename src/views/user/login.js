import React from 'react';
import LoginForm from '../../components/LoginForm';
import { withRouter } from 'react-router-dom';
const Login = (props) => {
  return (
    <div className="container-center">
      <div className="title-center">登录</div>
      <LoginForm></LoginForm>
    </div>
  );
};

export default withRouter(Login);
