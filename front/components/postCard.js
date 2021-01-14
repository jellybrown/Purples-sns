import "antd/dist/antd.css";
import { Card, Avatar } from "antd";
import CardContent from "./cardContent";

const { Meta } = Card;

const PostCard = () => {
  return (
    <>
      <Card
        style={{
          maxWidth: "500px",
          width: "93%",
          borderRadius: "30px",
          overflow: "hidden",
          boxShadow: "3px 3px 20px rgba(0,0,0,0.05)",
        }}
        cover={
          <img
            style={{ borderBottom: "1px solid #f0f0f0" }}
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
