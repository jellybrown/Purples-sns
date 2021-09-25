import React from "react";
import ROUTES from "constants/routesPath";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { HiOutlineMenu } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Dropdown } from "antd";
import Link from "next/link";
import DropdownUser from "./DropdownUser";
import useMediaQuery from "utils/useMediaQuery";
import { PCMenuWrapper, MobileWrapper, IconWrapper } from "./index.style";

const RightMenu = () => {
  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");
  const isTabletOrMobileDevice = useMediaQuery("(max-device-width: 1224px)");
  return (
    <>
      {isDesktopOrLaptop && (
        <PCMenuWrapper>
          <Link href={ROUTES.FIND}>
            <IconWrapper>
              <BsFillPersonPlusFill />
            </IconWrapper>
          </Link>
          <Link href={ROUTES.SEARCH}>
            <IconWrapper>
              <BiSearch />
            </IconWrapper>
          </Link>
          <Dropdown
            overlay={<DropdownUser />}
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
            overlay={<DropdownUser />}
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
