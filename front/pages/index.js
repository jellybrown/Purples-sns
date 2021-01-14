import React from "react";
import MainLogin from "../components/mainLogin";

const Main = ({ isAuthenticated }) => {
  return <div>{isAuthenticated ? <div>mainPage</div> : <MainLogin />}</div>;
};

export default Main;
