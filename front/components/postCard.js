import { Card, Avatar } from "antd";

import { FiHeart, FiMoreHorizontal } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { RiChat2Line, RiChat2Fill } from "react-icons/ri";
const { Meta } = Card;

const PostCard = () => {
  return (
    <>
      <Card
        style={{ width: "300px" }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
      >
        <Meta
          avatar={
            <Avatar
              bodyStyle={{ width: "30px" }}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          }
          title="Card title"
          description="This is the description"
        />
      </Card>
    </>
  );
};

export default PostCard;
