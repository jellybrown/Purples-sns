import "antd/dist/antd.css";
import { Card, Avatar } from "antd";
import CardContent from "./cardContent";
import PostCardImg from "./postCardImg";
import { useEffect } from "react";

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
          marginBottom: "70px",
        }}
        cover={<PostCardImg />}
      >
        <CardContent />
      </Card>
      <Card
        style={{
          maxWidth: "500px",
          width: "93%",
          borderRadius: "30px",
          overflow: "hidden",
          boxShadow: "3px 3px 20px rgba(0,0,0,0.05)",
          marginBottom: "70px",
        }}
        cover={<PostCardImg />}
      >
        <CardContent />
      </Card>
      <Card
        style={{
          maxWidth: "500px",
          width: "93%",
          borderRadius: "30px",
          overflow: "hidden",
          boxShadow: "3px 3px 20px rgba(0,0,0,0.05)",
          marginBottom: "70px",
        }}
        cover={<PostCardImg />}
      >
        <CardContent />
      </Card>
      <Card
        style={{
          maxWidth: "500px",
          width: "93%",
          borderRadius: "30px",
          overflow: "hidden",
          boxShadow: "3px 3px 20px rgba(0,0,0,0.05)",
          marginBottom: "70px",
        }}
        cover={<PostCardImg />}
      >
        <CardContent />
      </Card>
    </>
  );
};

export default PostCard;