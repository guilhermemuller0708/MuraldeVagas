import { StrictMode } from 'react';
import { render } from 'react-dom';
import './index.css';
import store from './redux/store';

import App from './App';
import setupAxios from 'redux/setupAxios';
import api from 'app/services/api';

setupAxios(api, store);

render(
  <StrictMode>
    <App store={store} />
  </StrictMode>,
  document.querySelector('#root')
);
