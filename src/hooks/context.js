import { createContext } from 'react';

const initUserState = {
  userInfo: null,
  isLogin: false,
};

const initOperateState = {
  status: 0, // 0 登录 1 注册
  visible: false,
  title: 'title',
  width: 520,
};

const initShoppingCartState = {
  list: [],
};
const userReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, userInfo: action.userInfo, isLogin: true };
    case 'logout':
      return { ...state, userInfo: null, isLogin: false };

    default:
      return state;
  }
};

const operateReducer = (state, action) => {
  switch (action.type) {
    case 'operate':
      return { ...state, ...action.data };
    default:
      return state;
  }
};

const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case 'add':
      return { ...state, list: [...action.list] };
    case 'del':
      return { ...state, list: state.filtter((item) => item.id !== action.id) };
    case 'clean':
      return { list: [] };
    default:
      return state;
  }
};

const AppContext = createContext(null);
export { AppContext, userReducer, operateReducer, shoppingCartReducer, initUserState, initOperateState, initShoppingCartState };
