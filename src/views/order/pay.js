import React, { useContext, useEffect, useState } from 'react';
import TopBar from '../../components/TopBar';
import CommonModal from '../../components/CommonModal';
import { message, Button } from 'antd';
import { AppContext } from '../../hooks/context';
import { getOrderToPay, updateOrder } from '../../api/main';
import { formatPrice } from '../../assets/js/utils';
import { withRouter, Link } from 'react-router-dom';
import Footer from '../../components/Footer';
const Pay = (props) => {
  const { productIds } = props.location.state;
  const { state } = useContext(AppContext);
  const [dataObj, setDataObj] = useState({});
  const [visible, setVisible] = useState(false);
  const userId = state.userReducer.userInfo && state.userReducer.userInfo.id;

  useEffect(() => {
    const getPay = () => {
      if (userId) {
        getOrderToPay({ params: { userId, productIds } }).then((res) => {
          if (res.data.code === 0) {
            setDataObj(res.data.data);
          } else {
            message.info(res.data.msg);
          }
        });
      }
    };
    getPay();
  }, [productIds, props.history, userId]);

  const toCancel = () => {
    setVisible(true);
  };
  // 模拟支付随机生成
  const toPay = () => {
    const arr = [1, 3];
    updateOrder({ userId, productIds, status: arr[Math.floor(Math.random() * arr.length)] }).then((res) => {
      if (res.data.code === 0) {
        props.history.push('/order/center');
      } else {
        message.info(res.data.msg);
      }
    });
  };

  const renderList = () => {
    if (Object.keys(dataObj).length) {
      if (dataObj.orderDetail.length) {
        let childs = [];
        dataObj.orderDetail.forEach((ele) => {
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
        return (
          <li key={dataObj.id}>
            <h1>
              <p>订单编号：{dataObj.outTradeNo}</p>
              <p>{dataObj.createTime}</p>
            </h1>
            <div className="order-detail">
              <div className="order-detail-main">{childs}</div>
              <div className="order-total-price">实付金额：￥{formatPrice(dataObj.totalFee)}</div>
            </div>
            <div className="pay-money">应付金额：￥{formatPrice(dataObj.totalFee)}</div>
            <div className="pay-btn">
              <Button danger size="large" shape="round" onClick={() => toCancel(dataObj.productIds)}>
                取消订单
              </Button>
              <Button type="primary" danger size="large" shape="round" onClick={() => toPay()}>
                立即支付
              </Button>
            </div>
          </li>
        );
      }
    } else {
      return <div className="no-data">暂无数据</div>;
    }
  };
  const handleCancel = (value) => {
    if (!productIds) return;
    updateOrder({ userId, productIds, status: 2 }).then((res) => {
      if (res.data.code === 0) {
        setVisible(value);
        props.history.push('/order/center');
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
          <div className="app-public-title">支付中心</div>
          <div className="app-order-container">
            <ul className="order-list">{renderList()}</ul>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <CommonModal width={400} visible={visible} closable={false} maskClosable={false} keyboard={false} component={<ModalContent {...props} cancel={handleCancel} enter={() => toPay()} />} handleCancel={handleCancel} />
    </>
  );
};
const ModalContent = (props) => {
  return (
    <div className="modal-cart-content">
      <div>亲，确定取消订单吗？</div>
      <div>
        <Button size="large" shape="round" onClick={() => props.cancel(false)}>
          残忍取消
        </Button>
        <Button type="primary" size="large" danger shape="round" onClick={() => props.enter()}>
          立即支付
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Pay);
