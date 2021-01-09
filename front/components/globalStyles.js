import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html, body {
    font-family: 'Noto Sans KR', sans-serif;
    width:100%;
    background: #333;
    position:relative;
    height:100vh;
  }
  * {
    box-sizing:border-box;
    padding:0;
    margin:0;
  }
  li {
    list-style: none;
  }
  a {
    border:none;
  }
  button {
    cursor: pointer;
    border: none;
  }
`;

export default GlobalStyles;
