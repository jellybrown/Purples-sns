import PropTypes from "prop-types";
import Head from "next/head";
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
      </Head>
      <Component />
    </>
  );
};
App.propTypes = {
  Component: PropTypes.element.isRequired,
};
export default App;
