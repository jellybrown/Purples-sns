import Layout from "./layout";
import MainProfile from "./mainProfile";
import PostCard from "./postCard";

const MainHome = () => {
  return (
    <Layout>
      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "8%",
            marginTop: "50px",
          }}
        >
          <PostCard />
        </div>
        <div style={{ position: "fixed", left: "5rem", top: "7rem" }}>
          <MainProfile />
        </div>
      </div>
    </Layout>
  );
};

export default MainHome;
