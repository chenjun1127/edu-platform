import React, { useContext } from 'react';
import TopBar from '../../components/TopBar';
import Profile from './profile';
import UserCourse from './user-course';
import { AppContext } from '../../hooks/context';
import { withRouter } from 'react-router-dom';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
const Index = (props) => {
  const { state } = useContext(AppContext);
  const { userInfo } = state.userReducer;
  // console.log(userInfo, props.match.params.id);
  return (
    <>
      <TopBar></TopBar>
      <div className="app-body-cart">
        <div className="cart-list-container">
          <div className="app-public-title">个人中心</div>
          <div className="app-order-container" style={{padding:"20px 0"}}>
            <Tabs defaultActiveKey="1" size="large" tabPosition="left">
              <TabPane tab="个人资料" key="1">
                <Profile {...userInfo}/>
              </TabPane>
              <TabPane tab="我的课程" key="2">
                <UserCourse/>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};
export default withRouter(Index);
