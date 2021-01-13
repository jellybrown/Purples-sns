import { FiHeart, FiMoreHorizontal } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { RiChat2Line, RiChat2Fill } from "react-icons/ri";
import CardComment from "./CardComment";

const CardContent = () => {
  return (
    <div>
      <div>
        <FiHeart />
        <RiChat2Line />
        <FiMoreHorizontal />
      </div>
      <div>
        <span>user name</span>
        <span>time</span>
        <div>케이크 먹을래?</div>
      </div>
      <CardComment />
    </div>
  );
};

export default CardContent;
