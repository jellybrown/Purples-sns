import React from "react";
import Main from "./Main";
import MainLogin from "./MainLogin";

const Home = ({ isAuthenticated }) => {
  return (
    <>
      {isAuthenticated !== null && isAuthenticated ? <Main /> : <MainLogin />}
    </>
  );
};

export default Home;
