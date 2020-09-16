import React, { useContext, useEffect, useState, useCallback } from 'react';
import { message, Pagination } from 'antd';
import { AppContext } from '../../hooks/context';
import { getAllOrder, delOrderById } from '../../api/main';
import { formatPrice } from '../../assets/js/utils';
import { withRouter, Link } from 'react-router-dom';
const Detail = (props) => {
  const { state } = useContext(AppContext);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const size = 5;
  const userId = state.userReducer.userInfo && state.userReducer.userInfo.id;
  const getAllOrdeData = useCallback(() => {
    if (userId) {
      getAllOrder({ params: { userId, status: props.status, pageNo: page, pageSize: size } }).then((res) => {
        if (res.data.code === 0) {
          setList(res.data.data.list);
          setTotal(res.data.data.total);
        } else {
          message.info(res.data.msg);
        }
      });
    }
  }, [page, props.status, userId]);
  useEffect(() => {
    getAllOrdeData();
  }, [getAllOrdeData]);
  const toDel = (id) => {
    delOrderById({ data: { id } }).then((res) => {
      if (res.data.code === 0) {
        message.success('删除成功', () => {
          getAllOrdeData();
        });
      }
    });
  };
  const renderStatus = (item) => {
    if (item.status === 0) {
      return (
        <span className="to-pay" onClick={() => props.history.push({ pathname: '/order/pay', state: { productIds: item.productIds } })}>
          去支付
        </span>
      );
    } else if (item.status === 1) {
      return <span className="is-completed">已完成</span>;
    } else if (item.status === 2) {
      return (
        <>
          <span className="is-cancel">已取消</span>
          <em onClick={() => toDel(item.id)}>删除订单</em>
        </>
      );
    } else if (item.status === 3) {
      return (
        <>
          <span>支付失败</span>
          <span className="to-pay" onClick={() => props.history.push({ pathname: '/order/pay', state: { productIds: item.productIds } })}>
            重新支付
          </span>
        </>
      );
    }
  };
  const renderList = () => {
    if (list.length) {
      let doms = [];
      list.forEach((item) => {
        if (item.orderDetail.length) {
          let childs = [];
          item.orderDetail.forEach((ele) => {
            childs.push(
              <div key={ele.id}>
                <img src={ele.course.coverImg} alt={ele.course.title} />
                <div>
                  <p>
                    <Link to={`/detail/${ele.course.id}`}>{ele.course.title}</Link>
                  </p>
                  <p>￥{formatPrice(ele.course.price)}</p>
                </div>
              </div>
            );
          });
          doms.push(
            <li key={item.id}>
              <h1>
                <p>订单编号：{item.outTradeNo}</p>
                <p>{item.createTime}</p>
              </h1>
              <div className="order-detail">
                <div className="order-detail-main">{childs}</div>
                <div className="order-total-price">总计：￥{formatPrice(item.totalFee)}</div>
                <div className="order-status"> {renderStatus(item)}</div>
              </div>
            </li>
          );
        }
      });
      return doms;
    } else {
      return <div className="no-data">暂无数据</div>;
    }
  };
  const onChange = (page) => {
    setPage(page);
  };
  return (
    <>
      <ul className="order-list">{renderList()}</ul>
      <div className="main-pagination">{total > 0 && <Pagination className="app-page" defaultCurrent={1} defaultPageSize={size} total={total} onChange={onChange} />}</div>
    </>
  );
};
export default withRouter(Detail);
