import React from 'react';
import RegisterForm from '../../components/RegisterForm';
import { withRouter } from 'react-router-dom';
const Register = (props) => {
  return (
    <div className="container-center">
      <div className="title-center">注册</div>
      <RegisterForm></RegisterForm>
    </div>
  );
};

export default withRouter(Register);
