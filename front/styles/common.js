import styled from "styled-components";

export const GradientBg = styled.section`
  height: 100vh;
  background: linear-gradient(#2f69ad, #824adc);
`;

export const LightColorBg = styled.section`
  min-height: 100vh;
  background: linear-gradient(#f1ebfb, #e9eef6);
  padding: 4em 0;
`;

export const AuthLink = styled.a`
  display: block;
  width: 100%;
  font-size: 0.8em;
  color: rgba(255, 255, 255, 0.4);
  text-align: right;
  padding-right: 1.5em;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
