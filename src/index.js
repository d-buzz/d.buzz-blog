import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './store';

import LightDarkTheme from './themes/LightDarkTheme';
import Main from './pages/Main';


ReactDOM.render(
  <LightDarkTheme>
    <Provider store={store}>
      <Main />
    </Provider>
  </LightDarkTheme>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
