import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 1em 3em;
  border: 1px solid #fff;
  border-radius: 20px;
  color: ${({ isBtn }) => (isBtn ? `#fff` : `rgba(255, 255, 255, 0.4)`)};
  background: ${({ isBtn }) => (isBtn ? `rgba(255, 255, 255, 0.1)` : `none`)};
`;

const Input = ({ ...props }) => {
  return <StyledInput {...props} />;
};

export default Input;
