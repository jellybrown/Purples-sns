import { FiMail } from "react-icons/fi";
import { BsFillPersonFill } from "react-icons/Bs";
import { HiLockClosed } from "react-icons/Hi";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import Input from "../styles/input";
import styled from "styled-components";

const SignupForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const password = useRef();
  password.current = watch("password");

  const onSubmit = (data) => console.log(data);

  const InputWrapper = styled.div`
    position: relative;
  `;

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
          placeholder="Email..."
          ref={register({
            required: true,
            pattern: /^\S+@\S+$/i,
            maxLength: 30,
          })}
        />
      </InputWrapper>
      {errors.email?.type === "required" && <p>이메일을 입력해주세요.</p>}
      {errors.email?.type === "pattern" && <p>이메일 형식이 맞지 않습니다.</p>}
      {errors.email?.type === "maxLength" && <p>이메일을 확인해주세요.</p>}
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
          placeholder="Nickname..."
          ref={register({
            required: true,
            minLength: 2,
          })}
        />
      </InputWrapper>
      {errors.nickname?.type === "required" && <p>닉네임을 입력해주세요.</p>}
      {errors.nickname?.type === "minLength" && (
        <p>닉네임은 2자이상 입력해주세요.</p>
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
      {errors.password?.type === "required" && <p>비밀번호를 입력해주세요.</p>}
      {errors.password?.type === "minLength" && (
        <p>비밀번호는 6자이상 입력해주세요.</p>
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
        <p>비밀번호 확인이 필요합니다.</p>
      )}
      {errors.confirm_password?.type === "minLength" && (
        <p>비밀번호는 6자이상 입력해주세요.</p>
      )}
      {errors.confirm_password?.type === "validate" && (
        <p>비밀번호가 일치하지 않습니다.</p>
      )}

      <Input
        isBtn
        value="가입하기"
        type="submit"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "5em",
          width: "40%",
          minWidth: "300px",
          maxWidth: "400px",
        }}
      />
    </form>
  );
};

export default SignupForm;
