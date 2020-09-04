import React from 'react';
import { hot } from 'react-hot-loader';
import './assets/css/common.scss';
import 'antd/dist/antd.css';
import './assets/css/app-antd.scss';
import 'core-js';
import Router from '../src/routes';
import './assets/css/main.scss';
import './assets/js/icons';
import { message } from 'antd';
message.config({ duration: 1 });

const App = () => <Router />;
export default hot(module)(App);
