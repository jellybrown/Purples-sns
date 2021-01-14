import { FiHeart, FiMoreHorizontal } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { RiChat2Line, RiChat2Fill } from "react-icons/ri";
import CardComment from "./CardComment";

const CardContent = () => {
  return (
    <div
      style={{
        padding: "0.8em 1.3em !important",
        position: "relative",
        minHeight: "168px",
        height: "20%",
        maxHeight: "500px",
      }}
    >
      <div
        style={{
          zIndex: "2",
          position: "absolute",
          right: 0,
          fontSize: "1.4rem",
        }}
      >
        <FiMoreHorizontal style={{ marginLeft: "0.5em", cursor: "pointer" }} />
        <RiChat2Line style={{ marginLeft: "0.5em", cursor: "pointer" }} />
        <FiHeart style={{ marginLeft: "0.5em", cursor: "pointer" }} />
      </div>
      <div>
        <span style={{ fontSize: "0.9rem", fontWeight: "500" }}>유진2</span>
        <span
          style={{ fontSize: "0.7rem", marginLeft: "1em", color: "#A3A3A3" }}
        >
          7 hours ago..
        </span>
        <div
          style={{
            fontSize: "0.8rem",
            paddingTop: "1.3em",
            paddingLeft: "1em",
          }}
        >
          케이크 먹을래?
        </div>
      </div>
      <CardComment /> {/* comment는 탭형식으로 오픈 */}
    </div>
  );
};

export default CardContent;
