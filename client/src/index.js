import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './redux/modules';
import './index.css';
import routes from './config/routes';

const store = createStore(
  combineReducers({ ...reducers }),
  applyMiddleware(thunk),
);

ReactDOM.render(
  <Provider store={store}>
    { routes }
  </Provider>,
  document.getElementById('root'),
);
