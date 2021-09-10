import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BiSearch } from "react-icons/bi";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { Menu } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useMediaQuery from "../../utils/useMediaQuery";
import Link from "next/link";
import { logout } from "../../redux/AuthSlice";

const UserMenu = () => {
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
              <LinkItem>
                <span>프로필</span>
                <FaUserCircle />
              </LinkItem>
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
              <LinkItem>
                <span>프로필</span>
                <FaUserCircle />
              </LinkItem>
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link href="/find">
              <LinkItem>
                <span>친구 찾기</span>
                <BsFillPersonPlusFill />
              </LinkItem>
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link href="/search">
              <LinkItem>
                <span>게시글 검색</span>
                <BiSearch />
              </LinkItem>
            </Link>
          </Menu.Item>
        </StyledMenu>
      ) : null}
    </>
  );
};

export default UserMenu;

const StyledMenu = styled(Menu)`
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  margin-top: 10px;
  width: 200px;
`;

const LinkItem = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > svg {
    font-size: 1.2rem;
  }
`;
