import React, { lazy } from 'react';

import Top from '../../components/Top';
// import Top from '../../components/Top';
// import Content from '../../components/Content';
// import Footer from '../../components/Footer';
// const Main = lazy(() => import('./main'));

const Main = lazy(() => import('./main'));



const Index = () => {
  return (
    <>
      <Top></Top>
      <Main></Main>
    </>
  );
};

export default Index;
