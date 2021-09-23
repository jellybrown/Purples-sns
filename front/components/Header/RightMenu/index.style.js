import styled from "styled-components";
import { Menu } from "antd";

export const PCMenuWrapper = styled.div`
  display: flex;
  font-size: 1.5rem;
  position: absolute;
  right: 6%;
  top: 50%;
  transform: translateY(-50%);
`;

export const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  margin: 0 5px;
  height: ${({ isMobile }) => (isMobile ? "25px" : "auto")};
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;

  > svg {
    font-size: 23px;
  }

  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;

export const MobileWrapper = styled.div`
  display: flex;
  font-size: 1.5rem;
  position: absolute;
  right: 4%;
  top: 50%;
  transform: translateY(-50%);
`;

export const DroppedMenu = styled(Menu)`
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  margin-top: 10px;
  width: 200px;
`;

export const DroppedLink = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > svg {
    font-size: 1.2rem;
  }
`;
