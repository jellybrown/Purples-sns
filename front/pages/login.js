import LoginForm from "../components/loginForm";
import Logo from "../components/logo";
import { GradientBg } from "../styles/bg";

const Login = () => {
  return (
    <GradientBg>
      <div style={{ textAlign: "center", paddingTop: "10em" }}>
        <Logo isForm />
      </div>
      <LoginForm />
    </GradientBg>
  );
};

export default Login;
