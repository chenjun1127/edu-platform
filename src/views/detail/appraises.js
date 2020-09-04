import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { AppContext } from '../../hooks/context';

const Appraises = (props) => {
  const { state } = useContext(AppContext);
  const userInfo = state.userReducer.userInfo;
  console.log(userInfo);
  return <>appraises</>;
};
export default withRouter(Appraises);
