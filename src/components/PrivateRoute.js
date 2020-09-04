import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, ...rest }) => {
  const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
  return <Route {...rest} render={(props) => (userInfo ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default PrivateRoute;
