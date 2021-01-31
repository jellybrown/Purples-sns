import { AiOutlineHome } from "react-icons/ai";
import Logo from "./logo";
import Link from "next/link";
import RightMenu from "./rightMenu";

const MainHeader = () => {
  return (
    <div
      style={{
        zIndex: "100",
        alignItems: "center",
        borderBottom: "1px solid #E1E1E1",
        padding: "0.8em 3em",
        position: "fixed",
        top: 0,
        textAlign: "center",
        width: "100%",
        background: "#fff",
      }}
    >
      <Link href="/">
        <a>
          <AiOutlineHome
            style={{
              fontSize: "1.5rem",
              position: "absolute",
              left: "4%",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        </a>
      </Link>
      <Logo style={{ fontSize: "1.8em" }} />
      <RightMenu />
    </div>
  );
};

export default MainHeader;
