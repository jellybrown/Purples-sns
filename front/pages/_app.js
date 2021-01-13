import React from "react";

import { createStore, applyMiddleware, Store, compose } from "redux";
import { createWrapper, Context, MakeStore } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga"; // redux-saga를 생성하기 위한 라이브러리
import rootReducer from "../redux/reducers";
import rootSaga from "../redux/sagas"; // sagas의 index.js를 가지고온다.
import { composeWithDevTools } from "redux-devtools-extension"; // redux devtools
import "antd/dist/antd.css";
import PropTypes from "prop-types";
import Head from "next/head";
import GlobalStyles from "../components/globalStyles";

const App = ({ Component, store }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="keywords"
          content="sns,purples,instagram,twitter,인스타그램,트위터,친구,사진첩"
        />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <meta property="og:type" content="web aplication" />
        <meta property="og:title" content="Purples" />
        <meta
          property="og:description"
          content="당신의 일상을 친구와 공유하세요 :) - Purples"
        />
        {/* <meta property="og:image" content="http://www.mysite.com/myimage.jpg" />
        <meta property="og:url" content="http://www.mysite.com" /> */}
        <title>Purples</title>
        <link rel="preconnect" href="https://fonts.gstatic.com"></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500&family=Yellowtail&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <GlobalStyles />
      <Component />
    </>
  );
};

const makeStore = (initialState = {}, options) => {
  // Create the middleware
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares));

  // Add an extra parameter for applying middleware
  // const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  const store = createStore(rootReducer, initialState, enhancer);

  // Run your sagas on server
  store.sagaTask = sagaMiddleware.run(rootSaga);

  // Return the store
  return store;
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default createWrapper(makeStore, { debug: true }).withRedux(App);
