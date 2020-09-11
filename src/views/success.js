import React, { useEffect, useState } from 'react';
import SvgIcon from '../components/SvgIcon';
import { withRouter } from 'react-router-dom';
const Success = (props) => {
  const { search } = props.location;
  const paramsString = search.substr(1);
  const searchParams = new URLSearchParams(paramsString);
  const type = parseInt(searchParams.get('type'));
  const [count, setCount] = useState(3);
  const successContent = [
    {
      type: 0,
      text: '邮件发送成功',
      callbackPath: '/',
    },
    {
      type: 1,
      text: '操作成功',
      callbackPath: '/',
    },
    {
      type: 2,
      text: '链接有效',
      callbackPath: '/',
    },
    {
      type: 3,
      text: '订单提交成功',
      callbackPath: '/order/center',
    },
  ];
  useEffect(() => {
    let timer;
    if (count > 0) {
      timer = setInterval(() => {
        setCount(count - 1);
      }, 1000);
    } else {
      if (type !== 3) {
        localStorage.clear();
        props.history.replace(successContent[type].callbackPath);
      } else {
        props.history.push(successContent[type].callbackPath);
      }
    }

    return () => {
      timer && clearInterval(timer);
    };
  }, [count, props.history, successContent, type]);

  return (
    <div className="operate-tips">
      <SvgIcon name="success" fill="#1890ff" style={{ fontSize: '100px' }} />
      <div>{successContent[type].text}，3秒后返回首页</div>
    </div>
  );
};
export default withRouter(Success);
