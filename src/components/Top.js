import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import UserCenter from './UserCenter';
import { Input } from 'antd';
import { AppContext } from '../hooks/context';
const { Search } = Input;
const Top = (props) => {
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
  const handleSearch = (value) => {
    if (value) {
      props.history.push({ pathname: '/search', search: `keyword=${value.trim()}` });
    }
  };
  return (
    <div className="app-top">
      <div className="app-top-inner">
        <ul className="menu">{renderMenu()}</ul>
        <div className="search">
          <Search placeholder="输入关键字" onSearch={handleSearch} style={{ width: 400 }} />
        </div>
        <UserCenter></UserCenter>
      </div>
    </div>
  );
};
export default withRouter(Top);
