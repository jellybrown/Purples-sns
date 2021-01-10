import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 1em 3.5em;
  margin: 15px 0;
  border: 1px solid #fff;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  color: ${({ isBtn }) => (isBtn ? `#fff` : `rgba(255, 255, 255, 0.5)`)};
  background: ${({ isBtn }) =>
    isBtn ? `rgba(255, 255, 255, 0.1)` : `transparent`};
  cursor: ${({ isBtn }) => (isBtn ? `pointer` : `text`)};
  transition: 0.3s;
  &:hover {
    background: ${({ isBtn }) =>
      isBtn ? `rgba(255, 255, 255, 0.2)` : `transparent`};
  }
  &:-webkit-autofill {
    webkit-box-shadow: 0 0 0 1000px transparent inset;
  }
  &&:-webkit-autofill,
  &&:-webkit-autofill:hover,
  &&:-webkit-autofill:focus,
  &&:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
    -webkit-text-fill-color: rgba(255, 255, 255, 0.5) !important;
  }
  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
`;

const Input = React.forwardRef(({ ...props }, ref) => {
  return <StyledInput {...props} ref={ref} />;
});

export default Input;
