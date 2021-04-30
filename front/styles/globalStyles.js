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
  .ant-btn.write-btn:hover,
  .ant-btn.write-btn:focus {
    background: #aab2e3;
  }
  .ant-menu-item a:hover {
    color:rgba(0, 0, 0, 0.85) !important;
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: #fff !important;
  }
 
  .slick-dots {
    margin-bottom: 40px !important;
  }
  .ant-card-body {
    padding: 10px 20px !important;
  }
  .custom__input {
    border-radius:50px !important;
  }
  .custom__modal.detail {
    .ant-modal-content {
      height: 250px;
    }
  }
  .ant-modal-wrap {
    
  }
  .custom__modal {
    width: 270px !important; 
    .anticon svg {
    display: none;
    }
    .ant-modal-content {
      width: 270px;
      height: 300px;
      text-align: center;
    }
    .ant-modal-content, 
    .ant-modal-header {
      border-radius: 20px;
    }
    p {
      padding: 1em 0 1.5em 0;
      margin: 0;
    } 
    span {
      padding: 1.5em 0;
      display: block;
    }
    hr {
      border: none;
      border-bottom: 1px solid #dfdfdf;
      width: 80%;
      margin: 0 auto;
    }
    .delete {
      color: #a9a9a9;
      cursor: pointer;
    }
    .info {
      color:#a9a9a9;
    }
    .go-detail {
      cursor: pointer;
    }
    .more__close {
      margin-top: 1em;
      background-color: #f4f4f4;
      width: 87%;
      padding: 1em 0;
      border-radius: 20px;
      outline:none;
      cursor: pointer;
    }
  }
  .custom__modal.follow {
    p, span {
      padding: 0;
    }
    .ant-modal-body {
      height: 200px;
      display: flex;
      flex-direction: column;
      align-items:center;
      justify-content:center;
    }
    .ant-modal-content {
      height: 200px;
    }
    .action__desc {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 5px;
    }
    .follow__state {
      color: #A9A9A9;
    }
    .icon {
      font-size: 1.3rem;
      margin-right: 10px;
      display:flex;
      align-items:center;
    }
    .action__text {
      text-decoration: underline;
      font-size: 1rem;
      cursor: pointer;
    }
    .more__close {
      margin-top: 30px;
    }
  }
`;

export default GlobalStyles;
