import React from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Dropdown } from "antd";
import Link from "next/link";
import UserMenu from "./UserMenu";
import useMediaQuery from "../../utils/useMediaQuery";
import styled from "styled-components";

const RightMenu = () => {
  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");
  const isTabletOrMobileDevice = useMediaQuery("(max-device-width: 1224px)");
  return (
    <>
      {isDesktopOrLaptop && (
        <PCMenuWrapper>
          <Link href="/find">
            <IconWrapper>
              <BsFillPersonPlusFill />
            </IconWrapper>
          </Link>
          <Link href="/search">
            <IconWrapper>
              <BiSearch />
            </IconWrapper>
          </Link>
          <Dropdown
            overlay={<UserMenu />}
            trigger="click"
            placement="bottomCenter"
          >
            <IconWrapper>
              <FaUserCircle />
            </IconWrapper>
          </Dropdown>
        </PCMenuWrapper>
      )}
      {isTabletOrMobileDevice && (
        <MobileWrapper>
          <Dropdown
            overlay={<UserMenu />}
            trigger="click"
            placement="bottomCenter"
          >
            <IconWrapper isMobile>
              <HiOutlineMenu />
            </IconWrapper>
          </Dropdown>
        </MobileWrapper>
      )}
    </>
  );
};

export default RightMenu;

const PCMenuWrapper = styled.div`
  display: flex;
  font-size: 1.5rem;
  position: absolute;
  right: 6%;
  top: 50%;
  transform: translateY(-50%);
`;

const IconWrapper = styled.div`
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

const MobileWrapper = styled.div`
  display: flex;
  font-size: 1.5rem;
  position: absolute;
  right: 4%;
  top: 50%;
  transform: translateY(-50%);
`;
