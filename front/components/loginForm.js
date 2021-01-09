import { FiMail } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/Bs";
import { HiLockClosed } from "react-icons/Hi";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import Input from "../styles/input";
import styled from "styled-components";

const LoginForm = () => {
  const password = useRef();
  const { register, handleSubmit, watch, errors } = useForm();

  password.current = watch("password");

  const onSubmit = (data) => console.log(data);

  const InputWrapper = styled.div`
    position: relative;
  `;

  const ErrorMessage = styled.p`
    color: red;
  `;

  return (
    <>
      <form
        style={{
          paddingTop: "5em",
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
        <a
          style={{
            display: "block",
            width: "100%",
            fontSize: "0.8em",
            color: "rgba(255,255,255,0.4)",
            textAlign: "right",
            paddingRight: "1.5em",
          }}
        >
          이미 회원입니다.
        </a>
      </form>
    </>
  );
};

export default LoginForm;
