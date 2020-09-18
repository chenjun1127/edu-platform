import React, { useContext, useEffect } from 'react';
import OperateModal from './OperateModal';
import { AppContext } from '../hooks/context';
import { getUserById } from '../api/base';
import { message } from 'antd';
import { withRouter, Link } from 'react-router-dom';
import Cart from './Cart';
const UserCenter = (props) => {
  const { state, dispatch } = useContext(AppContext);
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;
    // console.log(userInfo);
    if (userInfo) {
      getUserById({ id: userInfo.id }).then((res) => {
        if (res.data.code === 0) {
          dispatch({ type: 'login', userInfo: res.data.data });
          if (res.data.data.status === 0) {
            props.history.push({ pathname: '/active', query: { name: userInfo.name, email: userInfo.email, url: window.location.href } });
          }
        } else {
          message.info(res.data.msg, () => {
            localStorage.clear();
          });
        }
      });
    } else {
      localStorage.clear();
      dispatch({ type: 'logout' });
    }
  }, [dispatch, props.history]);

  const handleLogin = () => {
    dispatch({ type: 'operate', data: { status: 0, visible: true, title: '登录', width: 400 } });
  };
  const handleRegister = () => {
    dispatch({ type: 'operate', data: { status: 1, visible: true, title: '注册', width: 400 } });
  };
  const exit = () => {
    localStorage.clear();
    dispatch({ type: 'logout' });
    dispatch({ type: 'clean' });
    props.history.replace('/');
  };
  const { userInfo } = state.userReducer;
  return (
    <div className="user-right">
      <Cart {...userInfo} />
      {userInfo ? (
        <div className="user-info">
          <p>
            欢迎您，
            <span>
              <Link to={`/user/center/${userInfo.id}`}>{userInfo.name}</Link>
            </span>
          </p>
          <Link to={`/user/center/${userInfo.id}`}>
            <img src={userInfo.headImg ? userInfo.headImg : require('../assets/images/default-head.png')} alt="头像" />
          </Link>
          <span onClick={exit}>退出</span>
        </div>
      ) : (
        <div className="user-bar">
          <span onClick={() => handleLogin()}>登录</span> / <span onClick={() => handleRegister()}>注册</span>
        </div>
      )}
      <OperateModal></OperateModal>
    </div>
  );
};

export default withRouter(UserCenter);
