import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../../hooks/context';
import { getOrderDetailList } from '../../api/main';
import { message, Pagination, Button } from 'antd';
import { withRouter, Link } from 'react-router-dom';
const UserCourse = (props) => {
  const { state } = useContext(AppContext);
  const { userInfo } = state.userReducer;
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const size = 5;

  useEffect(() => {
    const getStudyCourse = () => {
      if (userInfo) {
        getOrderDetailList({ params: { userId: userInfo.id, orderStatus: 1, pageNo: page, pageSize: size } }).then((res) => {
          if (res.data.code === 0) {
            setList(res.data.data.list);
            setTotal(res.data.data.total);
          } else {
            message.info(res.data.msg);
          }
        });
      }
    };
    getStudyCourse();
  }, [page, userInfo]);
  const onChange = (value) => {
    setPage(value);
  };
  const renderList = () => {
    if (list.length) {
      return list.map((item, i) => {
        return (
          <li key={item.id} style={{ paddingTop: i === 0 && '10px' }}>
            <img src={item.course.coverImg} alt={item.course.title} />
            <div>
              <h1>
                <Link to={`/detail/${item.course.id}`}>{item.course.title}</Link>
              </h1>
              <p>评分：{item.course.point}</p>
            </div>
            <div>
              <Button danger size="large" shape="round" type="primary" onClick={() => props.history.push(`/detail/${item.course.id}`)}>
                继续学习
              </Button>
            </div>
          </li>
        );
      });
    } else {
      return <div className="no-data">暂无数据</div>;
    }
  };
  return (
    <>
      <ul className="user-course-list">{renderList()}</ul>
      <div className="main-pagination">{total > 0 && <Pagination className="app-page" defaultCurrent={1} defaultPageSize={size} total={total} onChange={onChange} />}</div>
    </>
  );
};
export default withRouter(UserCourse);
