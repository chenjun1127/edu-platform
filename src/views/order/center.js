import React, { useState } from 'react';
import TopBar from '../../components/TopBar';
import { Tabs } from 'antd';
import { withRouter } from 'react-router-dom';
import Detail from './detail';
import Footer from '../../components/Footer';
const { TabPane } = Tabs;

const Center = () => {
  const [isFixed, setIsFixed] = useState(true);
  const func = (value) => {
    setIsFixed(!value ? true : false);
  };
  const handleChange = () => {
    func();
  };
  return (
    <>
      <TopBar></TopBar>
      <div className="app-body-cart">
        <div className="cart-list-container">
          <div className="app-public-title">我的订单</div>
          <div className="app-order-container">
            <Tabs defaultActiveKey="1" size="large" onChange={handleChange}>
              <TabPane tab="全部订单" key="1">
                <Detail status="0" />
              </TabPane>
              <TabPane tab="已完成" key="2">
                <Detail status="1" />
              </TabPane>
              <TabPane tab="已取消" key="3">
                <Detail status="2" />
              </TabPane>
              <TabPane tab="支付失败" key="4">
                <Detail status="3" />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer func={func} isFixed={isFixed}></Footer>
    </>
  );
};
export default withRouter(Center);
