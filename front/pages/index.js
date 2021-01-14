import React from "react";
import MainHome from "../components/mainHome";
import MainLogin from "../components/mainLogin";

const Main = ({ isAuthenticated }) => {
  return <div>{isAuthenticated ? <MainHome /> : <MainLogin />}</div>;
};

export default Main;
