import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
const Fail = (props) => {
  const { search } = props.location;
  const paramsString = search.substr(1);
  const searchParams = new URLSearchParams(paramsString);
  const type = parseInt(searchParams.get('type'));
  const [count, setCount] = useState(3);
  const failContent = [
    {
      type: 0,
      text: '邮件发送失败，服务器开小差了',
    },
    {
      type: 1,
      text: '操作失败',
    },
    {
      type: 2,
      text: '链接错误或已失效',
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
      <img src={require('../assets/icons/fail.svg')} alt="fail" />
      <div>{failContent[type].text}，3秒后返回首页</div>
    </div>
  );
};
export default withRouter(Fail);
