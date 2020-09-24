import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserCenter from './UserCenter';
import { AppContext } from '../hooks/context';

const TopBar = () => {
  const { state } = useContext(AppContext);
  const { userInfo } = state.userReducer;
  const menu = [
    {
      text: '首页',
      path: '/',
    },
    {
      text: '个人中心',
      path: userInfo ? '/user/center/' + userInfo.id : '/login',
    },
  ];
  const renderMenu = () => {
    return menu.map((item, index) => {
      return (
        <li key={index}>
          <Link to={item.path}>{item.text}</Link>
        </li>
      );
    });
  };
  return (
    <div className="app-top-bar">
      <div className="app-top-bar-container">
        <ul className="menu">{renderMenu()}</ul>
        <UserCenter></UserCenter>
      </div>
    </div>
  );
};
export default TopBar;
