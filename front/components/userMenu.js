import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Menu, message } from "antd";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import useMediaQuery from "../utils/useMediaQuery";
import { LOGOUT_REQUEST } from "../redux/types";
import Router from "next/router";

const StyledMenu = styled(Menu)`
  box-shadow: none !important;
  -webkit-box-shadow: none !important;
  margin-top: 10px;
  width: 200px;
`;

const UserMenu = () => {
  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");
  const isTabletOrMobileDevice = useMediaQuery("(max-device-width: 1224px)");

  const dispatch = useDispatch();

  const handleLogoutClick = (e) => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    message.info("로그아웃에 성공하였습니다.", 1);
  };

  const handleProfileClick = (e) => {
    Router.push("/profile");
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
          <Menu.Item
            key="2"
            onClick={handleProfileClick}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>프로필</span>
            <FaUserCircle style={{ fontSize: "1.2rem" }} />
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
          <Menu.Item
            key="2"
            onClick={handleProfileClick}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>프로필</span>
            <FaUserCircle style={{ fontSize: "1.2rem" }} />
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={handleProfileClick}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>친구 찾기</span>
            <FaUserCircle style={{ fontSize: "1.2rem" }} />
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={handleProfileClick}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>게시글 검색</span>
            <FaUserCircle style={{ fontSize: "1.2rem" }} />
          </Menu.Item>
        </StyledMenu>
      ) : null}
      {isTabletOrMobileDevice && !loggedIn ? (
        <StyledMenu>
          <Menu.Item
            key="1"
            onClick={handleLogoutClick}
            style={{ borderBottom: "1px solid #ddd" }}
          >
            <span>로그인</span>
          </Menu.Item>

          <Menu.Item
            key="2"
            onClick={handleProfileClick}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>친구 찾기</span>
            <FaUserCircle style={{ fontSize: "1.2rem" }} />
          </Menu.Item>
          <Menu.Item
            key="2"
            onClick={handleProfileClick}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>게시글 검색</span>
            <FaUserCircle style={{ fontSize: "1.2rem" }} />
          </Menu.Item>
        </StyledMenu>
      ) : null}
    </>
  );
};

export default UserMenu;
