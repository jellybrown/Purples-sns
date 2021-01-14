import { LightColorBg } from "../styles/bg";
import MainHeader from "./MainHeader";

const Layout = ({ children }) => {
  return (
    <>
      <MainHeader />
      <LightColorBg>{children}</LightColorBg>
    </>
  );
};

export default Layout;
