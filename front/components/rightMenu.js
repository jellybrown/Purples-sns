import React from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Button, Dropdown, Menu, message } from "antd";
import { useDispatch } from "react-redux";
import { LOGOUT_REQUEST } from "../redux/types";
import Link from "next/link";
import Router from "next/router";
import UserMenu from "./userMenu";

const RightMenu = () => {
  return (
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
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "none",
            }}
          />
        </a>
      </Link>
      <Dropdown overlay={<UserMenu />} trigger="click" placement="bottomCenter">
        <Button
          color="black"
          shape="circle"
          size="large"
          icon={<FaUserCircle style={{ fontSize: "23px" }} />}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "none",
          }}
        />
      </Dropdown>
    </div>
  );
};

export default RightMenu;
