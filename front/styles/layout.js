import Header from "components/Header";
import { LightColorBg } from "./common";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <LightColorBg>{children}</LightColorBg>
    </>
  );
};

export default Layout;
