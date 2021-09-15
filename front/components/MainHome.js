import MainProfile from "./MainProfile";
import useMediaQuery from "../utils/useMediaQuery";
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

const PCScreen = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  margin-left: calc(10% + 320px);
  padding-left: 10%;
`;

const MobileScreen = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  margin-left: 0px;
  padding-left: 0px;
`;

const UserProfile = styled.div`
  position: fixed;
  left: 10%;
  top: 7rem;
`;

const MainHome = () => {
  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");
  const isTabletOrMobileDevice = useMediaQuery("(max-device-width: 1224px)");

  return (
    <Layout>
      <MainHomeWrapper>
        {isDesktopOrLaptop && (
          <>
            <PCScreen>
              <PostForm />
              <PostCards />
            </PCScreen>
            <UserProfile>
              <MainProfile />
            </UserProfile>
          </>
        )}
        {isTabletOrMobileDevice && (
          <>
            <MobileScreen>
              <PostForm />
              <PostCards />
            </MobileScreen>
          </>
        )}
      </MainHomeWrapper>
    </Layout>
  );
};

export default MainHome;
