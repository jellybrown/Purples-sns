import Header from "components/Header";
import { LightColorBg } from "../styles/bg";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <LightColorBg>{children}</LightColorBg>
    </>
  );
};

export default Layout;
