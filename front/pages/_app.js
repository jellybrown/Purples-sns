import PropTypes from "prop-types";
import Head from "next/head";
import GlobalStyles from "../components/globalStyles";
const App = ({ Component }) => {
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
App.propTypes = {
  Component: PropTypes.elementType.isRequired,
};
export default App;
