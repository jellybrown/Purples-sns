import Link from "next/link";
import { AuthLink, GradientBg } from "styles/common";
import Button from "styles/button";
import Logo from "styles/logo";
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
            <AuthLink>아직 회원이 아니신가요?</AuthLink>
          </Link>
          <Button onClick={alertMessage}>kakao로 로그인</Button>
          <Button onClick={alertMessage}>google로 로그인</Button>
        </LoginButtons>
      </LoginWrapper>
    </GradientBg>
  );
};

export default MainLogin;
