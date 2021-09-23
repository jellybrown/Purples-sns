import styled from "styled-components";
import { Switch } from "antd";

export const HeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 100;
  top: 0;

  .ant-switch-checked {
    background-color: #aab2e3;
  }
  .ant-dropdown-trigger {
    height: 30px;
  }
`;

export const FilterButton = styled(Switch)`
  &&& {
    font-size: 1.5rem;
    position: absolute;
    left: calc(6% + 35px);
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const HeaderMenu = styled.div`
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
  padding: 0.8em 3em;
  position: absolute;
  top: 0;
  text-align: center;
  width: 100%;
  background: #fff;
  z-index: 99;
`;

export const LinkItem = styled.a`
  display: inline-flex;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 4%;
  top: 50%;
  transform: translateY(-50%);
`;
