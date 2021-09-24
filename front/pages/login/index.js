import Logo from "styles/logo";
import { GradientBg } from "styles/common";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <GradientBg>
      <div style={{ textAlign: "center", paddingTop: "8em" }}>
        <Logo isForm />
      </div>
      <LoginForm />
    </GradientBg>
  );
};

export default Login;
