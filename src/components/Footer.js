import React, { useEffect, useState } from 'react';
const Footer = () => {
  const getWindowSize = () => ({
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
  });
  const [windowSize, setWindowSize] = useState(getWindowSize());
  const handleResize = () => {
    setWindowSize(getWindowSize());
  };
  console.log(windowSize)
  useEffect(() => {
    // 监听
    window.addEventListener('resize', handleResize);
    // 销毁
    return () => window.removeEventListener('resize', handleResize);
  });
  return <div className="app-footer">jone-chen版权所有© 2020</div>;
};
export default Footer;
