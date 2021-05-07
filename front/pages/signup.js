import SignupForm from "../components/Forms/SignupForm";
import Logo from "../components/Logo";
import { GradientBg } from "../styles/bg";

const Signup = () => {
  return (
    <GradientBg>
      <div style={{ textAlign: "center", paddingTop: "2em" }}>
        <Logo isForm />
      </div>
      <SignupForm />
    </GradientBg>
  );
};

export default Signup;
