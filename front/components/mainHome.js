import Layout from "./layout";
import MainProfile from "./mainProfile";
import PostCard from "./postCard";

const MainHome = () => {
  return (
    <Layout>
      <PostCard />
      <MainProfile />
    </Layout>
  );
};

export default MainHome;
