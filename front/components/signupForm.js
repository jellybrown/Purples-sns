import { FiMail } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/Bs";
import { HiLockClosed } from "react-icons/Hi";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import Input from "../styles/input";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { REGISTER_REQUEST } from "../redux/types";

const InputWrapper = styled.div`
  position: relative;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const SignupForm = () => {
  const dispatch = useDispatch();
  const [form, setValue] = useState({
    email: "",
    nickname: "",
    password: "",
    confirm_password: "",
  });

  const password = useRef();
  const { register, handleSubmit, watch, errors } = useForm();

  password.current = watch("password");

  const onChange = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, nickname, password } = form;
    const newUser = { nickname, email, password };
    console.log("newUser: ", newUser);
    dispatch({
      type: REGISTER_REQUEST,
      payload: newUser,
    });
  };

  return (
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
          value={form.email}
          placeholder="Email..."
          onChange={onChange}
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
        <BsFillPersonFill
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
          name="nickname"
          onChange={onChange}
          placeholder="Nickname..."
          ref={register({
            required: true,
            minLength: 2,
          })}
        />
      </InputWrapper>
      {errors.nickname?.type === "required" && (
        <ErrorMessage>닉네임을 입력해주세요.</ErrorMessage>
      )}
      {errors.nickname?.type === "minLength" && (
        <ErrorMessage>닉네임은 2자이상 입력해주세요.</ErrorMessage>
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
          onChange={onChange}
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
          name="confirm_password"
          onChange={onChange}
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
  );
};

export default SignupForm;