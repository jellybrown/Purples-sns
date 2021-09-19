import Link from "next/link";
import { StyledAtag } from "styles/aTag";
import { GradientBg } from "styles/bg";
import Button from "styles/button";
import Logo from "components/Logo";
import { LoginButtons, LogoWrapper, LoginWrapper } from "./index.style";

const MainLogin = () => {
  const alertMessage = () => {
    window.confirm("준비중인 서비스입니다.");
  };
  return (
    <GradientBg>
      <LoginWrapper>
        <LogoWrapper>
          <Logo isForm />
        </LogoWrapper>
        <LoginButtons>
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
        </LoginButtons>
      </LoginWrapper>
    </GradientBg>
  );
};

export default MainLogin;
