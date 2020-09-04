import React, { useContext, useEffect, useCallback } from 'react';
import { Dropdown, message, Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { AppContext } from '../hooks/context';
import SvgIcon from '../components/SvgIcon';
import { getCartList, deleteCartById } from '../api/main';
import { formatPrice } from '../assets/js/utils';
const Cart = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const getCart = useCallback(() => {
    if (props.id) {
      getCartList({ params: { userId: props.id } }).then((res) => {
        if (res.data.code === 0) {
          dispatch({ type: 'add', list: res.data.data });
        } else {
          message.info(res.data.msg);
        }
      });
    }
  }, [dispatch, props.id]);
  useEffect(() => {
    getCart();
  }, [getCart]);

  const deleteCart = (id) => {
    // delete方式传参
    deleteCartById({ data: { ids: [id] } }).then((res) => {
      if (res.data.code === 0) {
        getCart();
      } else {
        message.info(res.data.msg);
      }
    });
  };
  const renderCartList = (arr) => {
    return arr.map((item) => {
      return (
        <li key={item.id}>
          <img src={item.course.coverImg} alt={item.course.title} />
          <div>
            <p>{item.course.title}</p>
            <p>
              <span>￥{formatPrice(item.course.price)}</span>
              <em onClick={() => deleteCart(item.id)}>删除</em>
            </p>
          </div>
        </li>
      );
    });
  };
  const dropdownContent = () => {
    const list = state.shoppingCartReducer.list;
    return (
      <div className="shopping-cart-tooltip">
        <div className="shopping-cart-title">
          <span>我的购物车</span>
          <span>
            已加入<em>{list.length}</em>门课程
          </span>
        </div>
        {props.id && list.length ? (
          <ul className="shopping-cart-list">{renderCartList(list)}</ul>
        ) : (
          <div className="empty-cart">
            <img src={require('../assets/images/cart.png')} alt="" />
            <h1>购物车空空如也</h1>
            <p>快去挑选你中意的课程吧</p>
          </div>
        )}
        <div className="shopping-cart-bottom">
          <Link to={`/order/${props.id}`}>我的订单中心</Link>
          <Button shape="round" type="danger" onClick={() => props.history.push('/order/cart')}>
            去购物车
          </Button>
        </div>
      </div>
    );
  };
  return (
    <>
      <Dropdown overlay={dropdownContent} placement="bottomRight" arrow={true}>
        <Link to="/order/cart" className="shopping-cart">
          <SvgIcon name="cart" />
          <em>购物车</em>
          <span>{state.shoppingCartReducer ? state.shoppingCartReducer.list.length : 0}</span>
        </Link>
      </Dropdown>
    </>
  );
};
export default withRouter(Cart);
