import React, { lazy } from 'react';

import Top from '../../components/Top';
import Footer from '../../components/Footer';
import { withRouter } from 'react-router-dom';
// const Main = lazy(() => import('./main'));

const Main = lazy(() => import('./main'));

const Index = (props) => {
  return (
    <>
      <Top></Top>
      <Main></Main>
      <Footer></Footer>
    </>
  );
};

export default withRouter(Index);
