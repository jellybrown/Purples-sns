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
  .ant-modal-confirm-body {
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
  .ant-modal-confirm-body .ant-modal-confirm-content {
    margin-top: 0 !important;
  }
  .ant-modal-confirm-body-wrapper {
    padding-bottom: 20px;
  }
  .ant-modal-confirm-btns {
    display: none;
  }
  .anticon-check-circle {
    color: #aab2e3 !important;
    padding-right: 10px;
    transform: scale(1.2);
  }
  .ant-btn.write-btn:hover,
  .ant-btn.write-btn:focus {
    background: #aab2e3;
  }
  .ant-menu-item a:hover {
    color:rgba(0, 0, 0, 0.85) !important;
  }
  .ant-menu-item-selected a, 
  .ant-menu-item-selected a:hover,
  .ant-menu-item-active {
    color:rgba(0, 0, 0, 0.85) !important;
  }
  .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: #fff !important;
  }
  .ant-alert.ant-alert-info {
    background-color:rgba(255,255,255,0.3);
    border:1px solid #aab2e3;
    border-radius:17px;
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
`;

export default GlobalStyles;
