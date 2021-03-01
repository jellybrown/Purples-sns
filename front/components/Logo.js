import styled from "styled-components";

const StyledLogo = styled.div`
  font-family: "Yellowtail";
  font-size: ${({ isForm }) => (isForm ? `3rem` : `1.2rem`)};
  color: ${({ isForm }) => (isForm ? `white` : `black`)};
`;

const Logo = ({ ...props }) => {
  return <StyledLogo {...props}>Purples</StyledLogo>;
};

export default Logo;
