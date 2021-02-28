import LoginForm from "../components/Forms/LoginForm";
import Logo from "../components/Logo";
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
