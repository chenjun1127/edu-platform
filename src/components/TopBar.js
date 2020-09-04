import React from 'react';
import { Link } from 'react-router-dom';
import UserCenter from './UserCenter';
const menu = [
  {
    text: '首页',
    path: '/',
  },
  {
    text: '课程展示',
    path: '/course',
  },
  {
    text: '后台管理',
    path: '/admin',
  },
  {
    text: '个人中心',
    path: '/user',
  },
];
const TopBar = () => {
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
