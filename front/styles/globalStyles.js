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
  .custom__modal.detail {
    .ant-modal-content {
      height:250px;
    }
  }
  .custom__modal {
    width: 250px !important;
    
    .anticon svg {
    display:none
    }
    .ant-modal-content {
      width:250px;
      height:300px;
      text-align:center
    }
    .ant-modal-content, .ant-modal-header {
      border-radius: 20px ;
    }
    p {
      padding: 1em 0 1.5em 0;
      margin:0;
    } span {
      padding: 1.5em 0;
      display:block;
    }
    hr {
      border:none;
      border-bottom:1px solid #dfdfdf;
      width: 80%;
      margin:0 auto;
    }
    .delete {
      color:#a9a9a9;
      cursor: pointer;
    }
    .info {
      color:#a9a9a9;
    }
    .go-detail {
      cursor: pointer;
    }
    .more__close {
      margin-top:1em;
      background-color: #f4f4f4;
      width:87%;
      padding: 1em 0;
      border-radius:20px;
      outline:none;
      cursor: pointer;
    }
  }

`;

export default GlobalStyles;
//transform: scale(0);
