import MainProfile from "./MainProfile";
import useMediaQuery from "../utils/useMediaQuery";
import { Button } from "antd";
import { BsPencil } from "react-icons/bs";
import Layout from "../styles/layout";
import PostForm from "./Forms/PostForm";
import styled from "styled-components";
import PostCards from "./PostCard/PostCards";

const MainHomeWrapper = styled.div`
  position: relative;
  .pc__wrapper {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    margin-left: calc(10% + 320px);
    padding-left: 10%;
  }
  .user__profile {
    position: fixed;
    left: 10%;
    top: 7rem;
  }
  .mobile__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    margin-left: 0px;
    padding-left: 0px;
  }
`;

const MainHome = () => {
  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");
  const isTabletOrMobileDevice = useMediaQuery("(max-device-width: 1224px)");

  return (
    <Layout>
      <MainHomeWrapper>
        {isDesktopOrLaptop && (
          <>
            <div className="pc__wrapper">
              <PostForm />
              <PostCards />
            </div>
            <div className="user__profile">
              <MainProfile />
            </div>
          </>
        )}
        {isTabletOrMobileDevice && (
          <>
            <div className="mobile__wrapper">
              <PostForm />
              <PostCards />
            </div>
          </>
        )}
      </MainHomeWrapper>
      <Button
        style={{
          width: "3.8rem",
          height: "3.8rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50%",
          position: "fixed",
          right: "25px",
          bottom: "25px",
          boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
          background: "#aab2e3",
          border: "none",
        }}
      >
        <BsPencil style={{ fontSize: "2rem", color: "#fff" }} />
      </Button>
    </Layout>
  );
};

export default MainHome;
