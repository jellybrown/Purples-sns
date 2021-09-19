import MainProfile from "./MainProfile";
import useMediaQuery from "../../utils/useMediaQuery";
import Layout from "../../styles/layout";
import PostForm from "../Forms/PostForm";
import PostCards from "../PostCard/PostCards";
import {
  MainHomeWrapper,
  PCScreen,
  MobileScreen,
  UserProfile,
} from "./index.style";

const Main = () => {
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

export default Main;
