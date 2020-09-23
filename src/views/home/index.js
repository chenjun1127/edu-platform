import React from 'react';

import Top from '../../components/Top';
import Footer from '../../components/Footer';
import { withRouter } from 'react-router-dom';
import Main from './main';
const Index = () => {
  return (
    <>
      <Top></Top>
      <Main></Main>
      <Footer></Footer>
    </>
  );
};

export default withRouter(Index);
