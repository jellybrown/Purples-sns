import React, { useRef, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import Logo from "../Logo";
import Link from "next/link";
import RightMenu from "./RightMenu";
import { Switch, Button } from "antd";
import styled from "styled-components";
import FilterMenu from "./FilterMenu";
import { useSelector } from "react-redux";

const PostfilterWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 98;
  bottom: 0;
  background: #fff;
  padding: 1em;
  white-space: nowrap;
  overflow-x: auto;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  /* -webkit-transform: translateZ(0px);
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-perspective: 1000; */
`;

const MainHeader = () => {
  const [secondMenuY, setSecondMenuY] = useState(false);
  const { postFilter } = useSelector((state) => state.post);

  const onClickSlide = (checked) => {
    console.log(checked);

    if (secondMenuY) {
      setSecondMenuY(false);
    } else {
      setSecondMenuY(true);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "60px",
        zIndex: "100",
        top: 0,
      }}
    >
      <div
        style={{
          alignItems: "center",
          borderBottom: "1px solid #E1E1E1",
          padding: "0.8em 3em",
          position: "absolute",
          top: 0,
          textAlign: "center",
          width: "100%",
          background: "#fff",
          zIndex: "99",
        }}
      >
        <Link href="/">
          <a>
            <AiOutlineHome
              style={{
                fontSize: "1.5rem",
                position: "absolute",
                left: "4%",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </a>
        </Link>
        <Switch
          defaultChecked={false}
          style={{
            fontSize: "1.5rem",
            position: "absolute",
            left: "calc(6% + 35px)",
            top: "50%",
            transform: "translateY(-50%)",
          }}
          size="small"
          onClick={onClickSlide}
        />
        <Logo style={{ fontSize: "1.8em" }} />
        <RightMenu />
      </div>
      <FilterMenu secondMenu={secondMenuY} postFilter={postFilter} />
    </div>
  );
};

export default MainHeader;
