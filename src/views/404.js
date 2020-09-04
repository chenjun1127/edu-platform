import React from 'react';
import { Link } from 'react-router-dom';
const NoMatch = () => {
  return (
    <div className="error-page">
      <img src={require('../assets/images/404.png')} className="404-image" alt={404} />
      <h1>页面报错了，你访问的页面已离开地球</h1>
      <p>
        <Link to="/">点我返回首页</Link>
      </p>
    </div>
  );
};

export default NoMatch;
