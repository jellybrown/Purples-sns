import { FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useRef } from "react";

const SignupForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();

  const password = useRef();
  password.current = watch("password");

  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <FiMail />
        <input
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
      {errors.email?.type === "required" && <p>이메일을 입력해주세요.</p>}
      {errors.email?.type === "pattern" && <p>이메일 형식이 맞지 않습니다.</p>}
      {errors.email?.type === "maxLength" && <p>이메일을 확인해주세요.</p>}
      <div>
        <FiMail />
        <input
          name="nickname"
          placeholder="Nickname..."
          ref={register({
            required: true,
            minLength: 2,
          })}
        />
      </div>
      {errors.nickname?.type === "required" && <p>닉네임을 입력해주세요.</p>}
      {errors.nickname?.type === "minLength" && (
        <p>닉네임은 2자이상 입력해주세요.</p>
      )}
      <div>
        <FiMail />
        <input
          name="password"
          type="password"
          placeholder="Password..."
          ref={register({ required: true, minLength: 6 })}
        />
      </div>
      {errors.password?.type === "required" && <p>비밀번호를 입력해주세요.</p>}
      {errors.password?.type === "minLength" && (
        <p>비밀번호는 6자이상 입력해주세요.</p>
      )}
      <div>
        <FiMail />
        <input
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
      {/* errors will return when field validation fails  */}
      {errors.confirm_password?.type === "required" && (
        <p>비밀번호 확인이 필요합니다.</p>
      )}
      {errors.confirm_password?.type === "minLength" && (
        <p>비밀번호는 6자이상 입력해주세요.</p>
      )}
      {errors.confirm_password?.type === "validate" && (
        <p>비밀번호가 일치하지 않습니다.</p>
      )}

      <input value="가입하기" type="submit" />
    </form>
  );
};

export default SignupForm;
