import "antd/dist/antd.css";
import { Card, Avatar } from "antd";
import CardContent from "./cardContent";

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
        <CardContent />
      </Card>
    </>
  );
};

export default PostCard;
