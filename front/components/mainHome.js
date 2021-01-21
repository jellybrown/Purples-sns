import Layout from "./layout";
import MainProfile from "./mainProfile";
import PostCard from "./postCard";
import { useMediaQuery } from "react-responsive";

const MainHome = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });
  const isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 1224px)",
  });

  return (
    <Layout>
      <div style={{ position: "relative" }}>
        {isDesktopOrLaptop && (
          <>
            <div
              style={{
                display: "flex",
                marginTop: "50px",
                marginLeft: "calc(10% + 320px)",
                paddingLeft: "10%",
              }}
            >
              <PostCard /> {/* PostCards 컴포넌트 안에 돌리기 */}
            </div>
            <div style={{ position: "fixed", left: "10%", top: "7rem" }}>
              <MainProfile />
            </div>
          </>
        )}
        {isTabletOrMobileDevice && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
                marginLeft: "0px",
                paddingLeft: "0px",
              }}
            >
              <PostCard />
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default MainHome;
