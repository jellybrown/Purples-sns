import Logo from "styles/logo";
import { GradientBg } from "styles/common";
import SignupForm from "./SignupForm";

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
