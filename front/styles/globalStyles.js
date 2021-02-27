import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  html, body {
    font-family: 'Noto Sans KR', sans-serif;
    width:100%;
    font-size:16px;
    position:relative;
    height:100vh;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
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
  p,span {
    font-family: 'Noto Sans KR', sans-serif;
  }
  
  .slick-dots {
    margin-bottom: 40px !important;
  }
  .ant-card-body {
    padding: 10px 20px !important;
  }
`;

export default GlobalStyles;
