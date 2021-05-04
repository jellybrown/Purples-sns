import React from "react";
import { FiMail } from "react-icons/fi";
import { HiLockClosed } from "react-icons/Hi";
import { useForm } from "react-hook-form";
import Input from "../../styles/input";
import styled from "styled-components";
import Link from "next/link";
import { StyledAtag } from "../../styles/aTag";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/AuthSlice";

const LoginWrapper = styled.form`
  padding-top: 4em;
  margin: 0 auto;
  width: 40%;
  min-width: 300px;
  max-width: 400px;

  .input__wrapper {
    position: relative;
  }
  .login__icon {
    font-size: 1.4rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.8);
    margin-left: 1em;
  }
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
    const userInfo = { email: data.email, password: data.password };
    dispatch(loginUser(userInfo));
  };

  return (
    <>
      <LoginWrapper onSubmit={handleSubmit(onSubmit)}>
        <div className="input__wrapper">
          <FiMail className="login__icon" />
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
        </div>
        {errors.email?.type === "required" && (
          <ErrorMessage>이메일을 입력해주세요.</ErrorMessage>
        )}
        {errors.email?.type === "pattern" && (
          <ErrorMessage>이메일 형식이 맞지 않습니다.</ErrorMessage>
        )}
        {errors.email?.type === "maxLength" && (
          <ErrorMessage>이메일을 확인해주세요.</ErrorMessage>
        )}

        <div className="input__wrapper">
          <HiLockClosed className="login__icon" />
          <Input
            name="password"
            type="password"
            placeholder="Password..."
            ref={register({ required: true, minLength: 6 })}
          />
        </div>
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
      </LoginWrapper>
    </>
  );
};

export default LoginForm;
