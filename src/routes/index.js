import React, { Suspense, useReducer, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { AppContext, userReducer, operateReducer, shoppingCartReducer, initUserState, initOperateState, initShoppingCartState } from '../hooks/context';
import { combineReducers } from '../assets/js/utils';
import PrivateRoute from '../components/PrivateRoute';

const Home = lazy(() => import('../views/home/index'));
const UserActive = lazy(() => import('../views/user/active'));
const NoMatch = lazy(() => import('../views/404'));
const User = lazy(() => import('../views/user/index'));
const Success = lazy(() => import('../views/success'));
const Fail = lazy(() => import('../views/fail'));
const FindPassword = lazy(() => import('../views/user/find-password'));
const PasswordLink = lazy(() => import('../views/user/password-link'));
const ResetPassword = lazy(() => import('../views/user/reset-password'));
const Detail = lazy(() => import('../views/detail'));
const Login = lazy(() => import('../views/user/login'));
const Register = lazy(() => import('../views/user/register'));
const Order = lazy(() => import('../views/order/center'));
const Cart = lazy(() => import('../views/order/cart'));
const Confirm = lazy(() => import('../views/order/confirm'));
const Pay = lazy(() => import('../views/order/pay'));
const Routes = () => {
  // 多个useReducer
  const reducer = combineReducers({ userReducer, operateReducer, shoppingCartReducer });
  const initState = { userReducer: initUserState, operateReducer: initOperateState, shoppingCartReducer: initShoppingCartState };
  const [state, dispatch] = useReducer(reducer, initState);
  const value = { state, dispatch };
  return (
    <Router basename="/edu-platform">
      <Suspense
        fallback={
          <div className="loading-container">
            <LoadingOutlined />
          </div>
        }
      >
        <AppContext.Provider value={value}>
          <div className="app-container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/active" component={UserActive} />
              <Route path="/success" component={Success} />
              <Route path="/fail" component={Fail} />
              <Route path="/password" exact component={FindPassword} />
              <Route path="/password/link" component={PasswordLink} />
              <Route path="/password/reset" component={ResetPassword} />
              <Route path="/detail/:id" component={Detail} />
              <PrivateRoute path="/user/center/:id" component={User} />
              <PrivateRoute path="/order/center" component={Order} />
              <PrivateRoute path="/order/cart" exact component={Cart} />
              <PrivateRoute path="/order/confirm" component={Confirm} />
              <PrivateRoute path="/order/pay" component={Pay} />
              <Route component={NoMatch} />
            </Switch>
          </div>
        </AppContext.Provider>
      </Suspense>
    </Router>
  );
};

export default Routes;
