import { useEffect, useState } from "react";
import MainLogin from "../components/mainLogin";

const Main = () => {
  const [fakeLoggedin, setFakeLoggedin] = useState(true);
  {
    /* 임시 로그인  */
  }
  return <div>{fakeLoggedin ? <div>mainPage</div> : <MainLogin />}</div>;
};

export default Main;
