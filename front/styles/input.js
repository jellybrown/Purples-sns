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
  background: ${({ isBtn }) => (isBtn ? `rgba(255, 255, 255, 0.1)` : `none`)};
  cursor: ${({ isBtn }) => (isBtn ? `pointer` : `text`)};
  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
`;

const Input = ({ ...props }) => {
  return <StyledInput {...props} />;
};

export default Input;
