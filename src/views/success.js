import React, { useEffect, useState } from 'react';
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
    },
    {
      type: 1,
      text: '操作成功',
    },
    {
      type: 2,
      text: '链接有效',
    },
  ];
  useEffect(() => {
    let timer;
    if (count > 0) {
      timer = setInterval(() => {
        setCount(count - 1);
      }, 1000);
    } else {
      localStorage.clear();
      props.history.replace('/');
    }

    return () => {
      timer && clearInterval(timer);
    };
  }, [count, props.history]);

  return (
    <div className="operate-tips">
      <img src={require('../assets/icons/success.svg')} alt="success" />
      <div>{successContent[type].text}，3秒后返回首页</div>
    </div>
  );
};
export default withRouter(Success);
