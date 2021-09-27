import React, { memo, useState } from "react";
import ROUTES from "constants/routesPath";
import { AiOutlineHome } from "react-icons/ai";
import Logo from "styles/logo";
import Link from "next/link";
import RightMenu from "./RightMenu";
import FilterMenu from "./FilterMenu";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  HeaderWrapper,
  FilterButton,
  HeaderMenu,
  LinkItem,
} from "./index.style";

const Header = memo(() => {
  const router = useRouter();
  const isMainSection = () => router.pathname === ROUTES.HOME;
  const [secondMenuY, setSecondMenuY] = useState(false);
  const { postFilter } = useSelector((state) => state.post);

  const onClickSlide = () => {
    if (secondMenuY) setSecondMenuY(false);
    else setSecondMenuY(true);
  };

  return (
    <HeaderWrapper>
      <HeaderMenu>
        <Link href={ROUTES.HOME}>
          <LinkItem>
            <AiOutlineHome />
          </LinkItem>
        </Link>
        {isMainSection() && (
          <FilterButton
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
export default Header;
