import Link from "next/link";
import { StyledAtag } from "../styles/aTag";
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
          <Link href="/login">
            <a>
              <Button transparent>로그인</Button>
            </a>
          </Link>
          <Link href="/signup">
            <StyledAtag>아직 회원이 아니신가요?</StyledAtag>
          </Link>
          <Button>kakao로 로그인</Button>
          <Button>google로 로그인</Button>
        </div>
      </div>
    </GradientBg>
  );
};

export default MainLogin;
