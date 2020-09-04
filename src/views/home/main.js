import React, { useEffect, useState, useCallback } from 'react';
import { getAllCourse } from '../../api/main';
import { Pagination, message } from 'antd';
import { formatPrice } from '../../assets/js/utils';
import { Link } from 'react-router-dom';
const Main = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const size = 12;
  const getList = useCallback(() => {
    getAllCourse({ params: { page, size } }).then((res) => {
      if (res.data.code === 0) {
        setList(res.data.data.list);
        setTotal(res.data.data.total);
      }
    }).catch(err => {
      console.log(err)
      message.info("数据获取失败")
    });
  }, [page]);
  useEffect(() => {
    getList();
  }, [getList]);

  const rendList = () => {
    return list.map((item) => {
      return (
        <li key={item.id}>
          <Link to={`/detail/${item.id}`}>
            <img src={item.coverImg} alt={item.title} />
            <h1>{item.title}</h1>
            <p>{item.summary}</p>
            <p>
              <span>￥{formatPrice(item.price)}</span>
              <em>{item.point}</em>
            </p>
          </Link>
        </li>
      );
    });
  };

  const onChange = (page) => {
    setPage(page);
  };

  return (
    <div className="app-body">
      <ul className="main-list"> {rendList()}</ul>
      {total > 0 && <Pagination className="app-page" defaultCurrent={1} defaultPageSize={size} total={total} onChange={onChange} />}
    </div>
  );
};
export default Main;
