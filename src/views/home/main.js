import React, { useEffect, useState, useCallback } from 'react';
import { getAllCourse, createCourse } from '../../api/main';
import { Pagination, message } from 'antd';
import { SyncOutlined } from '@ant-design/icons';
import { formatPrice } from '../../assets/js/utils';
import { Link } from 'react-router-dom';
const Main = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [spin, setSpin] = useState(false);
  const size = 12;
  const getList = useCallback(() => {
    getAllCourse({ params: { pageNo: page, pageSize: size } }).then((res) => {
      if (res.data.code === 0) {
        setList(res.data.data.list);
        setTotal(res.data.data.total);
      }
    }).catch((err) => {
      console.log(err);
      message.info('数据获取失败');
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
              <em>{item.point.toFixed(2)}</em>
            </p>
          </Link>
        </li>
      );
    });
  };

  const onChange = (page) => {
    setPage(page);
  };
  const handRefresh = () => {
    setSpin(true);
    createCourse().then((res) => {
      if (res.data.code === 0) {
        setSpin(false);
        getList();
      } else {
        message.info(res.data.msg)
      }
    }).catch((err) => {
      console.log(err);
      message.info('数据获取失败');
    });
  };
  return (
    <>
      <div className="app-body">
        <ul className="main-list"> {rendList()}</ul>
        {total > 0 && <Pagination className="app-page" defaultCurrent={1} defaultPageSize={size} total={total} onChange={onChange} />}
      </div>
      <div className="refresh" onClick={handRefresh}>
        <SyncOutlined style={{ fontSize: '22px', color: '#1890ff' }} title="同步最新数据" spin={spin} />
      </div>
    </>
  );
};
export default Main;
