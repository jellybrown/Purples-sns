import React, { useEffect } from "react";
import { FiMail } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/Bs";
import { HiLockClosed } from "react-icons/Hi";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import Input from "../../styles/input";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/AuthSlice";
import Link from "next/link";
import { StyledAtag } from "../../styles/aTag";
import { message } from "antd";

const InputWrapper = styled.div`
  position: relative;
`;

const ErrorMessage = styled.p`
  font-size: 0.8rem;
  padding-left: 2em;
  color: rgba(255, 255, 255, 0.8);
`;

const SignupWrapper = styled.form`
  padding-top: 4em;
  margin: 0 auto;
  width: 40%;
  min-width: 300px;
  max-width: 400px;

  .input__wrapper {
    position: relative;
  }
  .signup__icon {
    font-size: 1.4rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.8);
    margin-left: 1em;
  }
`;

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
      <div className="input__wrapper">
        <FiMail className="signup__icon" />
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
        <BsFillPersonFill className="signup__icon" />
        <Input
          name="name"
          placeholder="Name..."
          ref={register({
            required: true,
            minLength: 2,
          })}
        />
      </div>
      {errors.name?.type === "required" && (
        <ErrorMessage>닉네임을 입력해주세요.</ErrorMessage>
      )}
      {errors.name?.type === "minLength" && (
        <ErrorMessage>닉네임은 2자이상 입력해주세요.</ErrorMessage>
      )}
      <div className="input__wrapper">
        <HiLockClosed className="signup__icon" />
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
      <div className="input__wrapper">
        <HiLockClosed className="signup__icon" />
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
      </div>
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
      <Link href="/login">
        <StyledAtag>이미 회원입니다.</StyledAtag>
      </Link>
    </SignupWrapper>
  );
};

export default SignupForm;
