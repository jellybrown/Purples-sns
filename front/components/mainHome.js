import Layout from "./layout";
import MainProfile from "./mainProfile";
import PostCard from "./postCard";
import useMediaQuery from "../utils/useMediaQuery";
import PostForm from "./postForm";
import { Button } from "antd";
import { BsPencil } from "react-icons/bs";
const MainHome = () => {
  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");
  const isTabletOrMobileDevice = useMediaQuery("(max-device-width: 1224px)");

  return (
    <Layout>
      <div style={{ position: "relative" }}>
        {isDesktopOrLaptop && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "50px",
                marginLeft: "calc(10% + 320px)",

                paddingLeft: "10%",
              }}
            >
              <PostForm />
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
                flexDirection: "column",
                alignItems: "center",
                marginTop: "50px",
                marginLeft: "0px",
                paddingLeft: "0px",
              }}
            >
              <PostForm />
              <PostCard />
            </div>
          </>
        )}
      </div>
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
