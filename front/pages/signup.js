import Logo from "../components/Logo";
import SignupForm from "../components/signupForm";
import styled from "styled-components";
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
