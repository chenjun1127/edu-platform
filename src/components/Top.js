import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserCenter from './UserCenter';
import { Input } from 'antd';
import { AppContext } from '../hooks/context';
const { Search } = Input;

const Top = () => {
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
    <div className="app-top">
      <div className="app-top-inner">
      <ul className="menu">{renderMenu()}</ul>
      <div className="search">
        <Search placeholder="输入关键字" enterButton="搜索" onSearch={(value) => console.log(value)} style={{ width: 400, height: 60 }} />
      </div>
      <UserCenter></UserCenter>
      </div>
    </div>
  );
};
export default Top;
