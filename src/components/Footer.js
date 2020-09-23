import React, { useEffect } from 'react';
const Footer = (props) => {
  const handleScroll = () => {
    let scrollTop = document.documentElement.scrollTop; // 滚动条滚动高度
    if (scrollTop > 0) {
      props.func && props.func(true);
    }
  };

  useEffect(() => {
    // 监听
    window.addEventListener('scroll', handleScroll);
    // 销毁
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return <div className={`app-footer ${props.isFixed ? 'footer-fixed' : ''}`}>jone-chen版权所有© 2020</div>;
};
export default Footer;
