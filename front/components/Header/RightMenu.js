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

const PCMenuWrapper = styled.div`
  display: flex;
  font-size: 1.5rem;
  position: absolute;
  right: 6%;
  top: 50%;
  transform: translateY(-50%);

  .icon__wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    margin: 0 5px;
  }
  .icon__wrapper.mobile {
    height: 25px;
  }
  a {
    color: rgba(0, 0, 0, 0.8);
    &:hover {
      color: rgba(0, 0, 0, 1);
    }
  }
`;

const MobileWrapper = styled.div`
  display: flex;
  font-size: 1.5rem;
  position: absolute;
  right: 4%;
  top: 50%;
  transform: translateY(-50%);

  .right-menu__icon {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
  }
`;

const RightMenu = () => {
  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");
  const isTabletOrMobileDevice = useMediaQuery("(max-device-width: 1224px)");
  return (
    <>
      {isDesktopOrLaptop && (
        <PCMenuWrapper>
          <Link href="/find">
            <a className="icon__wrapper">
              <BsFillPersonPlusFill style={{ fontSize: "23px" }} />
            </a>
          </Link>
          <Link href="/search">
            <a className="icon__wrapper">
              <BiSearch style={{ fontSize: "23px" }} />
            </a>
          </Link>
          <Dropdown
            overlay={<UserMenu />}
            trigger="click"
            placement="bottomCenter"
          >
            <a className="icon__wrapper">
              <FaUserCircle style={{ fontSize: "23px" }} />
            </a>
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
            <a className="icon__wrapper mobile">
              <HiOutlineMenu
                style={{ fontSize: "23px", color: "rgba(0,0,0,0.8)" }}
              />
            </a>
          </Dropdown>
        </MobileWrapper>
      )}
    </>
  );
};

export default RightMenu;
