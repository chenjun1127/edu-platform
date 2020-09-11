import React, { useRef, useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AppContext } from '../../hooks/context';
import CommonModal from '../../components/CommonModal';
import Footer from '../../components/Footer';
import Top from '../../components/Top';
import Trianglify from '../../assets/js/trianglify.min';
import { getCourseById, addToCart, getCartList, inquireIsBuy } from '../../api/main';
import { formatPrice } from '../../assets/js/utils';
import { Button, Tabs, message } from 'antd';
import Chapters from './chapters';
import Appraises from './appraises';
const { TabPane } = Tabs;
const Detail = (props) => {
  const [data, setData] = useState({});
  const { state, dispatch } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
  const [isBuy, setIsBuy] = useState(false);
  const userInfo = state.userReducer.userInfo;
  const couterRef = useRef();
  var pattern = Trianglify({
    width: window.innerWidth,
    height: 300,
  });
  couterRef.current && !document.querySelector('canvas') && couterRef.current.appendChild(pattern.canvas());
  useEffect(() => {
    const getDetail = () => {
      getCourseById({ id: props.match.params.id }).then((res) => {
        if (res.data.code === 0) {
          setData({ ...res.data.data });
        }
      });
    };
    const getInquireIsBuy = () => {
      if (userInfo) {
        inquireIsBuy({ params: { userId: userInfo.id, productId: props.match.params.id } }).then((res) => {
          if (res.data.code === 0) {
            res.data.data && setIsBuy(true);
          }
        });
      }
    };
    getDetail();
    getInquireIsBuy();
  }, [props.match.params.id, userInfo]);

  const addCart = (item) => {
    if (!userInfo) {
      props.history.push('/login');
    } else {
      addToCart({ userId: userInfo.id, courseId: item.id }).then((res) => {
        if (res.data.code !== 0) {
          // message.info(res.data.msg);
          setVisible(true);
        } else {
          getCartList({ params: { userId: userInfo.id } }).then((res) => {
            if (res.data.code === 0) {
              dispatch({ type: 'add', list: res.data.data });
            } else {
              message.info(res.data.msg);
            }
          });
        }
      });
    }
  };
  const handleCancel = (value) => {
    setVisible(value);
  };
  const renderBtn = () => {
    if (!userInfo || !isBuy) {
      return (
        <Button type="primary" danger size="large" shape="round" onClick={() => addCart(data)}>
          加入购物车
        </Button>
      );
    } else {
      return (
        <Button type="primary" danger size="large" shape="round" onClick={() => props.history.push('/order/center')}>
          去学习
        </Button>
      );
    }
  };
  return (
    <>
      <Top></Top>
      <div className="banner-container" ref={couterRef}>
        <div className="banner-text">
          <h1>{data.title}</h1>
          <h2>{data.summary}</h2>
          <div className="banner-bottom">
            <div>
              <h1>￥{data.price && formatPrice(data.price)}</h1>
              <p>
                <span>综合评分：{data.point}</span>
                <span>观看人数：{data.viewNum}</span>
                <span>更新时间：{data.createTime}</span>
              </p>
            </div>
            <div>{renderBtn()}</div>
          </div>
        </div>
      </div>
      <div className="detail-nav">
        <Tabs defaultActiveKey="1" size="large" centered>
          <TabPane tab="章节目录" key="1">
            {Object.keys(data).length && <Chapters data={data} />}
          </TabPane>
          <TabPane tab="用户评价" key="2">
            {Object.keys(data).length && <Appraises data={data} />}
          </TabPane>
        </Tabs>
      </div>
      <Footer></Footer>
      <CommonModal width={400} visible={visible} component={<ModalContent {...props} cancel={handleCancel} />} handleCancel={handleCancel} />
    </>
  );
};
const ModalContent = (props) => {
  return (
    <div className="modal-cart-content">
      <div>商品已经在购物车内</div>
      <div>
        <Button size="large" shape="round" onClick={() => props.cancel(false)}>
          继续逛逛
        </Button>
        <Button type="primary" size="large" danger shape="round" onClick={() => props.history.push('/order/cart')}>
          去购物车
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Detail);
