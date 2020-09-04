import React from 'react';
import TopBar from '../../components/TopBar';
import { withRouter } from 'react-router-dom';
import { formatPrice } from '../../assets/js/utils';
import { Button } from 'antd';
const Confirm = (props) => {
  const list = props.location.state.selectedList;
  let payMoney = 0;
  for (let i = 0; i < list.length; i++) {
    payMoney += list[i].course.price;
  }

  const renderCartList = () => {
    return list.map((item) => {
      return (
        <li key={item.id}>
          <div className="course-col">
            <img src={item.course.coverImg} alt={item.course.title} />
            <p>{item.course.title}</p>
          </div>
          <div className="money-col">￥{formatPrice(item.course.price)}</div>
        </li>
      );
    });
  };
  const toCalcMoney = () => {
    console.log(11);
  };
  return (
    <>
      <TopBar></TopBar>
      <div className="app-body-cart">
        <div className="cart-list-container">
          <div className="app-public-title">确认订单</div>
          <ul className="cart-list confirm-list">
            <li>
              <div className="course-col">商品信息</div>
              <div className="money-col">金额</div>
            </li>
            {renderCartList()}
            <li>
              <p>
                共{list.length}件商品，总计金额：<span>￥{formatPrice(payMoney)}</span>
              </p>
              <p>
                应付：<span>￥{formatPrice(payMoney)}</span>
              </p>
              <Button type="primary" danger size="large" shape="round" onClick={() => toCalcMoney()}>
                提交订单
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default withRouter(Confirm);
