import React, { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import Logo from "../Logo";
import Link from "next/link";
import RightMenu from "./RightMenu";
import { Switch } from "antd";
import styled from "styled-components";
import FilterMenu from "./FilterMenu";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const HeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 100;
  top: 0;
  .header__menu {
    align-items: center;
    border-bottom: 1px solid #e1e1e1;
    padding: 0.8em 3em;
    position: absolute;
    top: 0;
    text-align: center;
    width: 100%;
    background: #fff;
    z-index: 99;
  }
  .home__icon {
    font-size: 1.5rem;
    position: absolute;
    left: 4%;
    top: 50%;
    transform: translateY(-50%);
  }
  .filter__icon {
    font-size: 1.5rem;
    position: absolute;
    left: calc(6% + 35px);
    top: 50%;
    transform: translateY(-50%);
  }
`;

const MainHeader = () => {
  const router = useRouter();
  const isMainSection = () => router.pathname === "/";
  const [secondMenuY, setSecondMenuY] = useState(false);
  const { postFilter } = useSelector((state) => state.post);

  const onClickSlide = () => {
    if (secondMenuY) setSecondMenuY(false);
    else setSecondMenuY(true);
  };

  return (
    <HeaderWrapper>
      <div className="header__menu">
        <Link href="/">
          <a>
            <AiOutlineHome className="home__icon" />
          </a>
        </Link>
        {isMainSection() && (
          <Switch
            className="filter__icon"
            defaultChecked={false}
            size="small"
            onClick={onClickSlide}
          />
        )}
        <Logo style={{ fontSize: "1.8em" }} />
        <RightMenu />
      </div>
      {isMainSection() && (
        <FilterMenu secondMenu={secondMenuY} postFilter={postFilter} />
      )}
      )
    </HeaderWrapper>
  );
};

export default MainHeader;
