import React, { useContext, useCallback, useEffect, useState } from 'react';
import TopBar from '../../components/TopBar';
import { AppContext } from '../../hooks/context';
import { getCartList, deleteCartById } from '../../api/main';
import { formatPrice } from '../../assets/js/utils';
import { message, Button } from 'antd';
import { withRouter } from 'react-router-dom';
const Cart = (props) => {
  const { state, dispatch } = useContext(AppContext);
  const [selectedAll, setSelectedAll] = useState(true);
  const [newList, setNewList] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
  const userId = state.userReducer.userInfo && state.userReducer.userInfo.id;
  const getCart = useCallback(() => {
    if (userId) {
      getCartList({ params: { userId } }).then((res) => {
        if (res.data.code === 0) {
          dispatch({ type: 'add', list: res.data.data });
        } else {
          message.info(res.data.msg);
        }
      });
    }
  }, [dispatch, userId]);
  // console.log(state)
  useEffect(() => {
    const { list } = state.shoppingCartReducer;
    const arr = [];
    let money = 0;
    list.forEach((item) => {
      arr.push({ ...item, ...{ checked: true } });
      money += item.course.price;
    });
    setNewList(arr);
    setTotalMoney(money);
  }, [state.shoppingCartReducer]);
  // console.log(newList);
  const deleteCart = (id) => {
    // delete方式传参
    deleteCartById({ data: { ids: [id], userId } }).then((res) => {
      if (res.data.code === 0) {
        getCart();
      } else {
        message.info(res.data.msg);
      }
    });
  };

  const renderCartList = () => {
    return newList.map((item) => {
      return (
        <li key={item.id}>
          <div className="selection-col">
            <span onClick={() => toggleSelected(item)} className={`select ${item.checked ? 'selected' : ''}`}></span>
            <span>{item.checked === false}</span>
          </div>
          <div className="course-col">
            <img src={item.course.coverImg} alt={item.course.title} />
            <p>{item.course.title}</p>
          </div>
          <div className="money-col">￥{formatPrice(item.course.price)}</div>
          <div className="operate-col">
            <span onClick={() => deleteCart(item.courseId)}>&times;</span>
          </div>
        </li>
      );
    });
  };
  // 全选
  const toggleSelectedAll = (value) => {
    setSelectedAll(value);
    const arr = [];
    let money = 0;
    for (let i = 0; i < newList.length; i++) {
      newList[i].checked = value ? true : false;
      money += newList[i].course.price;
      arr.push(newList[i]);
    }
    setNewList(arr);
    setTotalMoney(value ? money : 0);
  };
  // 单选
  const toggleSelected = (item) => {
    const arr = [];
    let money = 0;
    for (let i = 0; i < newList.length; i++) {
      if (newList[i].id === item.id) {
        newList[i].checked = !item.checked;
      }
      arr.push(newList[i]);
    }
    const unCheckedAll = arr.filter((item) => !item.checked);
    const checkedAll = arr.filter((item) => item.checked);
    setSelectedAll(!unCheckedAll.length ? true : false);
    setNewList(arr);
    checkedAll.forEach((item) => {
      money += item.course.price;
    });
    setTotalMoney(money);
  };
  const toConfirm = () => {
    const checkedAll = newList.filter((item) => item.checked);
    props.history.push({ pathname: '/order/confirm', state: { userId, selectedList: checkedAll } });
  };
  return (
    <>
      <TopBar></TopBar>
      <div className="app-body-cart">
        <div className="cart-list-container">
          <div className="app-public-title">我的购物车</div>
          {newList.length ? (
            <ul className="cart-list">
              <li>
                <div className="selection-col" onClick={() => toggleSelectedAll(selectedAll === false)}>
                  <span className={`select ${selectedAll ? 'selected' : ''}`}></span>
                  <span>全选</span>
                </div>
                <div className="course-col">课程</div>
                <div className="money-col">金额</div>
                <div className="operate-col">操作</div>
              </li>
              {renderCartList()}
              <li>
                <p>
                  总计金额：<span>￥{formatPrice(totalMoney)}</span>
                </p>
                <Button type="primary" danger size="large" shape="round" onClick={() => toConfirm()}>
                  去结算
                </Button>
              </li>
            </ul>
          ) : (
            <div className="cart-blank">购物车空空如也</div>
          )}
        </div>
      </div>
    </>
  );
};
export default withRouter(Cart);
