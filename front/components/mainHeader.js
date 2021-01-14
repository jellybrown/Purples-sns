import { AiOutlineHome } from "react-icons/ai";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import Logo from "./logo";

const MainHeader = () => {
  return (
    <div
      style={{
        zIndex: "100",
        alignItems: "center",
        borderBottom: "1px solid #E1E1E1",
        padding: "0.8em 3em",
        position: "fixed",
        textAlign: "center",
        width: "100%",
        background: "#fff",
      }}
    >
      <AiOutlineHome
        style={{
          fontSize: "1.5rem",
          position: "absolute",
          left: "3em",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
      <Logo style={{ fontSize: "1.5rem" }} />
      <div
        style={{
          fontSize: "1.5rem",
          position: "absolute",
          right: "3em",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <BsFillPersonPlusFill style={{ marginLeft: "0.7em" }} />
        <BiSearch style={{ marginLeft: "0.7em" }} />
        <FaUserCircle style={{ marginLeft: "0.7em" }} />
      </div>
    </div>
  );
};

export default MainHeader;
