import React, { memo, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import Logo from "../Logo";
import Link from "next/link";
import RightMenu from "./RightMenu";
import { Switch } from "antd";
import styled from "styled-components";
import FilterMenu from "./FilterMenu";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const MainHeader = memo(() => {
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
      <HeaderMenu>
        <Link href="/">
          <LinkItem>
            <AiOutlineHome />
          </LinkItem>
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
      </HeaderMenu>
      {isMainSection() && (
        <FilterMenu secondMenu={secondMenuY} postFilter={postFilter} />
      )}
      )
    </HeaderWrapper>
  );
});
export default MainHeader;

const HeaderWrapper = styled.header`
  position: fixed;
  width: 100%;
  height: 60px;
  z-index: 100;
  top: 0;

  .ant-switch-checked {
    background-color: #aab2e3;
  }
  .filter__icon {
    font-size: 1.5rem;
    position: absolute;
    left: calc(6% + 35px);
    top: 50%;
    transform: translateY(-50%);
  }
  .ant-dropdown-trigger {
    height: 30px;
  }
`;

const HeaderMenu = styled.div`
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
  padding: 0.8em 3em;
  position: absolute;
  top: 0;
  text-align: center;
  width: 100%;
  background: #fff;
  z-index: 99;
`;

const LinkItem = styled.a`
  display: inline-flex;
  font-size: 1.5rem;
  color: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 4%;
  top: 50%;
  transform: translateY(-50%);
`;
