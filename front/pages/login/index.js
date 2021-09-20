import Logo from "components/Logo";
import { GradientBg } from "styles/bg";
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
