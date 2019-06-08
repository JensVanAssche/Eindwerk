import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import ReduxThunk from "redux-thunk";
import promiseMiddleware from "utils/promiseMiddleware";
import rootReducer from "./rootReducer";
import App from "./app/App";

const reduxDevTools =
  window.navigator.userAgent.includes("Chrome") &&
  window.__REDUX_DEVTOOLS_EXTENSION__ // eslint-disable-line no-underscore-dangle
    ? window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line no-underscore-dangle
    : compose;

const middleWare = [ReduxThunk, promiseMiddleware()];
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleWare),
    reduxDevTools
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
