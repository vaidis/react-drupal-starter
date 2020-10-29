import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from "react-router-dom";

import { saveState } from './state/localStorage'
import store from './state/store'
import history from "./state/history";

import './index.css';
import App from './App';


store.subscribe(() => {
  saveState({
    store: store.getState()
  });
});

ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>,
  document.getElementById('root')
);

// import * as serviceWorker from './serviceWorker';
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
