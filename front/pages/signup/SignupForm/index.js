import React, { useEffect } from "react";
import ROUTES from "constants/routesPath";
import { FiMail } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import Input from "styles/input";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "redux/AuthSlice";
import Link from "next/link";
import { message } from "antd";
import { SignupWrapper, InputWrapper, ErrorMessage } from "./index.style";
import { AuthLink } from "styles/common";

const SignupForm = () => {
  const dispatch = useDispatch();
  const { successMsg, errorMsg } = useSelector((state) => state.auth);
  const password = useRef();
  const { register, handleSubmit, watch, errors } = useForm();
  password.current = watch("password");

  const onSubmit = (data) => {
    const { email, name, password } = data;
    const newUser = { name, email, password };
    dispatch(registerUser(newUser));
  };

  useEffect(() => {
    if (successMsg !== "") {
      message.info(successMsg, 1);
    }
    if (errorMsg !== "") {
      message.info(errorMsg, 1);
    }
  }, [successMsg, errorMsg]);

  return (
    <SignupWrapper onSubmit={handleSubmit(onSubmit)}>
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
        <BsFillPersonFill />
        <Input
          name="name"
          placeholder="Name..."
          ref={register({
            required: true,
            minLength: 2,
          })}
        />
      </InputWrapper>
      {errors.name?.type === "required" && (
        <ErrorMessage>닉네임을 입력해주세요.</ErrorMessage>
      )}
      {errors.name?.type === "minLength" && (
        <ErrorMessage>닉네임은 2자이상 입력해주세요.</ErrorMessage>
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
      <InputWrapper>
        <HiLockClosed />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm password..."
          ref={register({
            required: true,
            minLength: 6,
            validate: (value) => value === password.current,
          })}
        />
      </InputWrapper>
      {errors.confirm_password?.type === "required" && (
        <ErrorMessage>비밀번호 확인이 필요합니다.</ErrorMessage>
      )}
      {errors.confirm_password?.type === "minLength" && (
        <ErrorMessage>비밀번호는 6자이상 입력해주세요.</ErrorMessage>
      )}
      {errors.confirm_password?.type === "validate" && (
        <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
      )}

      <Input
        isBtn
        value="가입하기"
        type="submit"
        style={{ marginTop: "2.5em" }}
      />
      <Link href={ROUTES.LOGIN}>
        <AuthLink>이미 회원입니다.</AuthLink>
      </Link>
    </SignupWrapper>
  );
};

export default SignupForm;
