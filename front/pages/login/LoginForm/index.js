import React from "react";
import { FiMail } from "react-icons/fi";
import { HiLockClosed } from "react-icons/hi";
import { useForm } from "react-hook-form";
import Input from "styles/input";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { loginUser } from "redux/AuthSlice";
import { LoginWrapper, InputWrapper, ErrorMessage } from "./index.style";
import { AuthLink } from "styles/common";

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
        <InputWrapper>
          <FiMail />
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
          <HiLockClosed />
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
          <AuthLink>아직 회원이 아니신가요?</AuthLink>
        </Link>
      </LoginWrapper>
    </>
  );
};

export default LoginForm;
