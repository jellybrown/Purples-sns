import React from "react";
import MainHome from "../components/MainHome";
import MainLogin from "../components/mainLogin";

const Main = ({ isAuthenticated }) => {
  return (
    <div>
      {isAuthenticated !== null && isAuthenticated ? (
        <MainHome />
      ) : (
        <MainLogin />
      )}
    </div>
  );
};

export default Main;
