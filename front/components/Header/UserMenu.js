import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Menu, message } from "antd";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import useMediaQuery from "../../utils/useMediaQuery";
import Link from "next/link";
import { logout } from "../../redux/AuthSlice";

const StyledMenu = styled(Menu)`
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  margin-top: 10px;
  width: 200px;

  .menu__link {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const UserMenu = () => {
  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");
  const isTabletOrMobileDevice = useMediaQuery("(max-device-width: 1224px)");

  const dispatch = useDispatch();

  const handleLogoutClick = (e) => {
    dispatch(logout());
    message.info("로그아웃에 성공하였습니다.", 1);
  };

  const loggedIn = true;

  return (
    <>
      {isDesktopOrLaptop && (
        <StyledMenu>
          <Menu.Item
            key="1"
            onClick={handleLogoutClick}
            style={{ borderBottom: "1px solid #ddd" }}
          >
            <span>로그아웃</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/profile">
              <a className="menu__link">
                <span>프로필</span>
                <FaUserCircle style={{ fontSize: "1.2rem" }} />
              </a>
            </Link>
          </Menu.Item>
        </StyledMenu>
      )}
      {isTabletOrMobileDevice && loggedIn ? (
        <StyledMenu>
          <Menu.Item
            key="1"
            onClick={handleLogoutClick}
            style={{ borderBottom: "1px solid #ddd" }}
          >
            <span>로그아웃</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/profile">
              <a className="menu__link">
                <span>프로필</span>
                <FaUserCircle style={{ fontSize: "1.2rem" }} />
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href="/find">
              <a className="menu__link">
                <span>친구 찾기</span>
                <BsFillPersonPlusFill style={{ fontSize: "1.2rem" }} />
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link href="/search">
              <a className="menu__link">
                <span>게시글 검색</span>
                <BiSearch style={{ fontSize: "1.2rem" }} />
              </a>
            </Link>
          </Menu.Item>
        </StyledMenu>
      ) : null}
    </>
  );
};

export default UserMenu;
