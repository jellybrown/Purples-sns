import MainHeader from "../components/Header/MainHeader";
import { LightColorBg } from "../styles/bg";

const Layout = ({ children }) => {
  return (
    <>
      <MainHeader />
      <LightColorBg>{children}</LightColorBg>
    </>
  );
};

export default Layout;
