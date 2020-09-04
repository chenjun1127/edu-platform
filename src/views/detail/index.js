import React, { useRef, useEffect, useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AppContext } from '../../hooks/context';
import CommonModal from '../../components/CommonModal';
import Top from '../../components/Top';
import Trianglify from '../../assets/js/trianglify.min';
import { getCourseById, addToCart, getCartList } from '../../api/main';
import { formatPrice } from '../../assets/js/utils';
import { Button, Tabs, message } from 'antd';
import Chapters from './chapters';
import Appraises from './appraises';
const { TabPane } = Tabs;
const Detail = (props) => {
  const [data, setData] = useState({});
  const { state, dispatch } = useContext(AppContext);
  const [visible, setVisible] = useState(false);
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
    getDetail();
  }, [props.match.params.id]);
  const addCart = (item) => {
    const userInfo = state.userReducer.userInfo;
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
            <div>
              <Button type="primary" danger size="large" shape="round" onClick={() => addCart(data)}>
                加入购物车
              </Button>
            </div>
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
      <CommonModal width={400} visible={visible} component={<ModalContent {...props} handleCancel={handleCancel} />} handleCancel={handleCancel}></CommonModal>
    </>
  );
};
const ModalContent = (props) => {
  return (
    <div className="modal-cart-content">
      <div>商品已经在购物车内</div>
      <div>
        <Button size="large" shape="round" onClick={() => props.handleCancel(false)}>
          继续逛逛
        </Button>
        <Button type="primary" size="large" danger shape="round" onClick={() => props.history.push('/cart')}>
          去购物车
        </Button>
      </div>
    </div>
  );
};

export default withRouter(Detail);
