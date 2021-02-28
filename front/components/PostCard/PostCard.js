import "antd/dist/antd.css";
import { Card } from "antd";
import CardContent from "./CardContent";
import PostCardImg from "./PostCardImg";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POST_REQUEST } from "../../redux/types";

const { Meta } = Card;

const PostCard = () => {
  const { posts, loading } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_POST_REQUEST,
      payload: 0,
    });
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Card
          style={{
            maxWidth: "500px",
            width: "93%",
            borderRadius: "30px",
            overflow: "hidden",
            boxShadow: "3px 3px 20px rgba(0,0,0,0.05)",
            marginBottom: "70px",
          }}
          cover={<PostCardImg images={post.imageUrls} />}
        >
          <CardContent
            contents={post.contents}
            writer={post.writer.name}
            date={post.date}
          />
        </Card>
      ))}
    </>
  );
};

export default PostCard;
