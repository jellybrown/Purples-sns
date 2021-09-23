import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "utils/useMediaQuery";
import Link from "next/link";
import { logout } from "redux/AuthSlice";
import { DroppedLink, DroppedMenu } from "./index.style";

const DropdownUser = () => {
  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");
  const isTabletOrMobileDevice = useMediaQuery("(max-device-width: 1224px)");
  const loggedIn = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <>
      {isDesktopOrLaptop && (
        <DroppedMenu>
          <Menu.Item
            key="1"
            onClick={handleLogoutClick}
            style={{ borderBottom: "1px solid #ddd" }}
          >
            <span>로그아웃</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/profile">
              <DroppedLink>
                <span>프로필</span>
                <FaUserCircle />
              </DroppedLink>
            </Link>
          </Menu.Item>
        </DroppedMenu>
      )}
      {isTabletOrMobileDevice && loggedIn ? (
        <DroppedMenu>
          <Menu.Item
            key="1"
            onClick={handleLogoutClick}
            style={{ borderBottom: "1px solid #ddd" }}
          >
            <span>로그아웃</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/profile">
              <DroppedLink>
                <span>프로필</span>
                <FaUserCircle />
              </DroppedLink>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href="/find">
              <DroppedLink>
                <span>친구 찾기</span>
                <BsFillPersonPlusFill />
              </DroppedLink>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link href="/search">
              <DroppedLink>
                <span>게시글 검색</span>
                <BiSearch />
              </DroppedLink>
            </Link>
          </Menu.Item>
        </DroppedMenu>
      ) : null}
    </>
  );
};

export default DropdownUser;
