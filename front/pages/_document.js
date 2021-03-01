import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";
import React from "react";

/*
 * _document.js는 SPA에서 시작점이 되는 index.html 역할
 * static html을 구성하기 위한 _app.js에서 구성한 Html body가 어떤 형태로 들어갈지 구성하는 곳이다.
 * 서버에서만 렌더링되며 onClick과 같은 이벤트 핸들러가 동작하지 않는다.
 * 스타일시트 링크
 * 폰트 임포팅
 * 도큐먼트 기본 설정 (meta/link)
 * 여기에는 애플리케이션 로직을 넣지 않는다.
 */
export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html>
        <Head>
          {this.props.styleTags}
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
          />
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
          <link rel="preconnect" href="https://fonts.gstatic.com"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Yellowtail&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
