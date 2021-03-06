import React from "react";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FcMenu } from "react-icons/fc";
import { BiSearch } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Button, Dropdown } from "antd";
import Link from "next/link";
import UserMenu from "./UserMenu";
import useMediaQuery from "../../utils/useMediaQuery";

const RightMenu = () => {
  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");
  const isTabletOrMobileDevice = useMediaQuery("(max-device-width: 1224px)");
  return (
    <>
      {isDesktopOrLaptop && (
        <div
          style={{
            display: "flex",
            fontSize: "1.5rem",
            position: "absolute",
            right: "6%",
            top: "50%",
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
          <Dropdown
            overlay={<UserMenu />}
            trigger="click"
            placement="bottomCenter"
          >
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
      )}
      {isTabletOrMobileDevice && (
        <div
          style={{
            display: "flex",
            fontSize: "1.5rem",
            position: "absolute",
            right: "4%",
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <Dropdown
            overlay={<UserMenu />}
            trigger="click"
            placement="bottomCenter"
          >
            <Button
              color="black"
              shape="circle"
              size="large"
              icon={<FcMenu style={{ fontSize: "23px" }} />}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "none",
              }}
            />
          </Dropdown>
        </div>
      )}
    </>
  );
};

export default RightMenu;