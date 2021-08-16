import React from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './index.scss';
import { store } from './redux/store';

import App from './App';
import setupAxios from 'redux/setupAxios';
import api from 'app/services/api';

setupAxios(api, store);

render(
  <>
    <App store={store} />
  </>,
  document.querySelector('#root')
);
