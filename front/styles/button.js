import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  padding: 1em 3.5em;
  margin: 15px 0;
  border: 1px solid #fff;
  border-radius: 40px;
  font-size: 1rem;
  outline: none;
  color: rgba(255, 255, 255, 0.5);
  background: ${({ transparent }) =>
    transparent ? `transparent` : `rgba(255, 255, 255, 0.1)`};
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const Button = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};

export default Button;
