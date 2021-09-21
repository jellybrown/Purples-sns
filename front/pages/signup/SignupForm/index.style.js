import styled from "styled-components";

export const SignupWrapper = styled.form`
  padding-top: 4em;
  margin: 0 auto;
  width: 40%;
  min-width: 300px;
  max-width: 400px;
`;

export const InputWrapper = styled.div`
  position: relative;

  > svg {
    font-size: 1.4rem;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(255, 255, 255, 0.8);
    margin-left: 1em;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 0.8rem;
  padding-left: 2em;
  color: rgba(255, 255, 255, 0.8);
`;
