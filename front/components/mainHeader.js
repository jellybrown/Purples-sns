import { AiOutlineHome } from "react-icons/ai";
import Logo from "./logo";
import Link from "next/link";
import RightMenu from "./rightMenu";
import { Switch } from "antd";
import { useRef, useState } from "react";
import styled from "styled-components";

const PostfilterWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 98;
  bottom: 0;
  background: #fff;
  padding: 1em;
  white-space: nowrap;
  overflow-x: auto;
  display: flex;
  justify-content: space-around;

  /* -webkit-transform: translateZ(0px);
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-perspective: 1000; */
`;

const MainHeader = () => {
  const [secondMenuY, setSecondMenuY] = useState(false);
  const filterPostMenu = useRef();

  const onClick = (checked) => {
    console.log(checked);
    console.log(filterPostMenu);

    if (secondMenuY) {
      filterPostMenu.current.style.transition = "0.5s";
      filterPostMenu.current.style.transform = "translateY(0)";
      setSecondMenuY(false);
    } else {
      filterPostMenu.current.style.transition = "0.5s";
      filterPostMenu.current.style.transform = "translateY(52px)";
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
              onClick={onClick}
            />
          </a>
        </Link>
        <Logo style={{ fontSize: "1.8em" }} />
        <RightMenu />
      </div>
      <PostfilterWrapper ref={filterPostMenu}>
        <span>All</span>
        <span>Followings</span>
        <span>Followers</span>
        <span>My</span>
      </PostfilterWrapper>
    </div>
  );
};

export default MainHeader;
