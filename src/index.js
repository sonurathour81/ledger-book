import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App';
import { createStore,applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga';
import reducer from './redux/reducers/index';
import rootSaga from './redux/saga/index';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer,applyMiddleware(logger,sagaMiddleware));

sagaMiddleware.run(rootSaga);


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
