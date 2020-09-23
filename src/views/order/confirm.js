import React from 'react';
import TopBar from '../../components/TopBar';
import { withRouter, Link } from 'react-router-dom';
import { formatPrice } from '../../assets/js/utils';
import { orderPlace } from '../../api/main';
import { Button, message } from 'antd';
import Footer from '../../components/Footer';
const Confirm = (props) => {
  const { selectedList, userId } = props.location.state;
  let productIds = [];
  let payMoney = 0;
  for (let i = 0; i < selectedList.length; i++) {
    payMoney += selectedList[i].course.price;
    productIds.push(selectedList[i].courseId);
  }

  const renderCartList = () => {
    return selectedList.map((item) => {
      return (
        <li key={item.id}>
          <div className="course-col">
            <img src={item.course.coverImg} alt={item.course.title} />
            <p>
              <Link to={`/detail/${item.courseId}`}>{item.course.title}</Link>
            </p>
          </div>
          <div className="money-col">￥{formatPrice(item.course.price)}</div>
        </li>
      );
    });
  };
  const toCalcMoney = () => {
    orderPlace({ userId, productIds }).then((res) => {
      if (res.data.code === 0) {
        props.history.push({ pathname: '/order/pay', state: { productIds: productIds.toString() } });
      } else {
        message.info(res.data.msg);
      }
    });
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
                共{selectedList.length}件商品，总计金额：<span>￥{formatPrice(payMoney)}</span>
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
      <Footer></Footer>
    </>
  );
};
export default withRouter(Confirm);
