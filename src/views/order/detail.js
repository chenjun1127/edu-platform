import React, { useContext, useEffect, useState, useCallback } from 'react';
import { message } from 'antd';
import { AppContext } from '../../hooks/context';
import { getAllOrder, delOrderById } from '../../api/main';
import { formatPrice } from '../../assets/js/utils';
import { withRouter } from 'react-router-dom';
const Detail = (props) => {
  const { state } = useContext(AppContext);
  const [list, setList] = useState([]);
  const userId = state.userReducer.userInfo && state.userReducer.userInfo.id;
  const getAllOrdeData = useCallback(() => {
    if (userId) {
      getAllOrder({ params: { userId, status: props.status } }).then((res) => {
        if (res.data.code === 0) {
          setList(res.data.data);
        } else {
          message.info(res.data.msg);
        }
      });
    }
  }, [props.status, userId]);
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
    } else {
      return (
        <>
          <span className="is-cancel">已取消</span>
          <em onClick={() => toDel(item.id)}>删除订单</em>
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
                  <p>{ele.course.title}</p>
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
  return <ul className="order-list">{renderList()}</ul>;
};
export default withRouter(Detail);
