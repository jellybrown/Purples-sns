import Link from "next/link";
import styled from "styled-components";
import { StyledAtag } from "../styles/aTag";
import { GradientBg } from "../styles/bg";
import Button from "../styles/button";
import Logo from "./Logo";

const LoginWrapper = styled.div`
  width: 40%;
  min-width: 300px;
  max-width: 400px;
  margin: 0 auto;

  .logo__wrapper {
    text-align: center;
    padding-top: 8em;
  }
  .login-btns {
    padding-top: 4em;
  }
`;

const MainLogin = () => {
  const alertMessage = () => {
    window.confirm("준비중인 서비스입니다.");
  };
  return (
    <GradientBg>
      <LoginWrapper>
        <div className="logo__wrapper">
          <Logo isForm />
        </div>
        <div className="login-btns">
          <Link href="/login">
            <a>
              <Button transparent>로그인</Button>
            </a>
          </Link>
          <Link href="/signup">
            <StyledAtag>아직 회원이 아니신가요?</StyledAtag>
          </Link>
          <Button onClick={alertMessage}>kakao로 로그인</Button>
          <Button onClick={alertMessage}>google로 로그인</Button>
        </div>
      </LoginWrapper>
    </GradientBg>
  );
};

export default MainLogin;
