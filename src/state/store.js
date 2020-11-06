import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';

import { loadState } from './localStorage'
import IndexReducers from '../index-reducers'
import IndexSagas from '../index-sagas'

const sagaMiddleware = createSagaMiddleware()
const persistedState = loadState();

//
// Redux DevTools
// https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
//
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  IndexReducers,
  persistedState,
  composeEnhancers(applyMiddleware(sagaMiddleware)
  ));

sagaMiddleware.run(IndexSagas)

store.subscribe(() => {
  window.api = store.getState().api;

});

export default store;
