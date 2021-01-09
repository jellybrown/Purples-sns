import Logo from "../components/logo";
import SignupForm from "../components/signupForm";

const Signup = () => {
  return (
    <>
      <div style={{ textAlign: "center", marginTop: "2em" }}>
        <Logo isForm />
      </div>
      <SignupForm />
    </>
  );
};

export default Signup;
