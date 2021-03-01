import LoginForm from "../components/Forms/loginForm";
import Logo from "../components/logo";
import { GradientBg } from "../styles/bg";

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
