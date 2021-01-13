import { useEffect, useState } from "react";
import MainHome from "../components/mainHome";
import MainLogin from "../components/mainLogin";

const Main = () => {
  const [fakeLoggedin, setFakeLoggedin] = useState(true);
  {
    /* 임시 로그인  */
  }
  return <div>{fakeLoggedin ? <MainHome /> : <MainLogin />}</div>;
};

export default Main;
