import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import GlobalStyles from "../styles/globalStyles";
import "antd/dist/antd.css";
import { wrapper } from "../redux/store";
/*
 * Application Container. 공통의 레이아웃을 작성.
 * client에서 띄우길 바라는 전체 컴포넌트의 레이아웃.
 * 공통 레이아웃이므로 최초에 실행되어 내부에 들어갈 컴포넌트들을 실행한다.
 * - 지속적으로 띄울 레이아웃
 * - 페이지를 탐색할 때 상태 유지
 * - componentDidCatch를 사용하여 사용자 정의 오류 처리
 * - 추가 데이터를 페이지에 주입
 * - 글로벌 CSS 추가
 */

const App = ({ Component, pageProps }) => {
  // Component는 요청한 페이지로 `GET /` 요청을 받으면, /pages/index.js 파일이 props로 내려오게 된다.
  // pageProps는 페이지 getInitialProps를 통해 내려받은 props를 의미한다.
  // 다음으로 _document.js가 실행된다.

  return (
    <>
      <Head>
        <title>Purples</title>
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  );
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(App);
