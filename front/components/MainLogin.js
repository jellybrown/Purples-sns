import { GradientBg } from "../styles/bg";
import Button from "../styles/button";
import Logo from "./logo";

const MainLogin = () => {
  return (
    <GradientBg>
      <div
        style={{
          width: "40%",
          minWidth: "300px",
          maxWidth: "400px",
          margin: "0 auto",
        }}
      >
        <div style={{ textAlign: "center", paddingTop: "8em" }}>
          <Logo isForm />
        </div>
        <div style={{ paddingTop: "4em" }}>
          <Button transparent>로그인</Button>
          <a
            style={{
              display: "block",
              width: "100%",
              fontSize: "0.8em",
              color: "rgba(255,255,255,0.4)",
              textAlign: "right",
              paddingRight: "1.5em",
              marginBottom: "2em",
            }}
          >
            아직 회원이 아니신가요?
          </a>
          <Button>kakao로 로그인</Button>
          <Button>google로 로그인</Button>
        </div>
      </div>
    </GradientBg>
  );
};

export default MainLogin;
