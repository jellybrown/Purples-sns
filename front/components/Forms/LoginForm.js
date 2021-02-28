import { FiMail } from "react-icons/fi";
import { HiLockClosed } from "react-icons/Hi";
import { useForm } from "react-hook-form";
import Input from "../../styles/input";
import styled from "styled-components";
import Link from "next/link";
import { StyledAtag } from "../../styles/aTag";
import { useDispatch } from "react-redux";
import { LOG_IN_REQUEST } from "../../redux/types";

const InputWrapper = styled.div`
  position: relative;
`;

const ErrorMessage = styled.p`
  font-size: 0.8rem;
  padding-left: 2em;
  color: rgba(255, 255, 255, 0.8);
`;

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const loginUser = { email: data.email, password: data.password };
    dispatch({
      type: LOG_IN_REQUEST,
      payload: loginUser,
    });
  };

  return (
    <>
      <form
        style={{
          paddingTop: "4em",
          margin: "0 auto",
          width: "40%",
          minWidth: "300px",
          maxWidth: "400px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputWrapper>
          <FiMail
            style={{
              fontSize: "1.4rem",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255,255,255,0.8)",
              marginLeft: "1em",
            }}
          />
          <Input
            name="email"
            type="email"
            placeholder="Email..."
            ref={register({
              required: true,
              pattern: /^\S+@\S+$/i,
              maxLength: 30,
            })}
          />
        </InputWrapper>
        {errors.email?.type === "required" && (
          <ErrorMessage>이메일을 입력해주세요.</ErrorMessage>
        )}
        {errors.email?.type === "pattern" && (
          <ErrorMessage>이메일 형식이 맞지 않습니다.</ErrorMessage>
        )}
        {errors.email?.type === "maxLength" && (
          <ErrorMessage>이메일을 확인해주세요.</ErrorMessage>
        )}

        <InputWrapper>
          <HiLockClosed
            style={{
              fontSize: "1.4rem",
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              color: "rgba(255,255,255,0.8)",
              marginLeft: "1em",
            }}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password..."
            ref={register({ required: true, minLength: 6 })}
          />
        </InputWrapper>
        {errors.password?.type === "required" && (
          <ErrorMessage>비밀번호를 입력해주세요.</ErrorMessage>
        )}
        {errors.password?.type === "minLength" && (
          <ErrorMessage>비밀번호는 6자이상 입력해주세요.</ErrorMessage>
        )}

        <Input
          isBtn
          value="로그인"
          type="submit"
          style={{ marginTop: "3em" }}
        />
        <Link href="/signup">
          <StyledAtag>아직 회원이 아니신가요?</StyledAtag>
        </Link>
      </form>
    </>
  );
};

export default LoginForm;
