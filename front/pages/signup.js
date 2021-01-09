import Logo from "../components/logo";
import SignupForm from "../components/signupForm";
import styled from "styled-components";

const GradientBg = styled.section`
  height: 100vh;
  background: linear-gradient(#2f69ad, #824adc);
`;

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
