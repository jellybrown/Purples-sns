import { AiOutlineHome } from "react-icons/ai";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import Logo from "./logo";
import { Button, Dropdown, Menu, message } from "antd";
import { useDispatch } from "react-redux";
import { LOGOUT_REQUEST } from "../redux/types";
import Router from "next/router";
import Link from "next/link";

const MainHeader = () => {
  const dispatch = useDispatch();

  function handleLogoutClick(e) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    message.info("로그아웃에 성공하였습니다.", 1);
  }

  const handleProfileClick = (e) => {
    Router.push("/profile");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1" onClick={handleProfileClick}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogoutClick}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        zIndex: "100",
        alignItems: "center",
        borderBottom: "1px solid #E1E1E1",
        padding: "0.8em 3em",
        position: "fixed",
        top: 0,
        textAlign: "center",
        width: "100%",
        background: "#fff",
      }}
    >
      <Link href="/">
        <a>
          <AiOutlineHome
            style={{
              fontSize: "1.5rem",
              position: "absolute",
              left: "6%",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        </a>
      </Link>
      <Logo style={{ fontSize: "1.8em" }} />
      <div
        style={{
          display: "flex",
          fontSize: "1.5rem",
          position: "absolute",
          right: "6%",
          top: "50%",
          display: "flex",
          transform: "translateY(-50%)",
        }}
      >
        <Link href="/find">
          <a>
            <Button
              color="black"
              shape="circle"
              size="large"
              icon={<BsFillPersonPlusFill style={{ fontSize: "23px" }} />}
              style={{
                marginLeft: "0.7em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
              }}
            />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Button
              color="black"
              shape="circle"
              size="large"
              icon={<BiSearch style={{ fontSize: "23px" }} />}
              style={{
                marginLeft: "0.7em",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
              }}
            />
          </a>
        </Link>
        <Dropdown overlay={userMenu} trigger="click" placement="bottomCenter">
          <Button
            color="black"
            shape="circle"
            size="large"
            icon={<FaUserCircle style={{ fontSize: "23px" }} />}
            style={{
              marginLeft: "0.7em",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
            }}
          />
        </Dropdown>
      </div>
    </div>
  );
};

export default MainHeader;
