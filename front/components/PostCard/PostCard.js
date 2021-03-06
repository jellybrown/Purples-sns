import React, { useEffect, useRef } from "react";
import "antd/dist/antd.css";
import { Alert, Card } from "antd";
import CardContent from "./CardContent";
import PostCardImg from "./PostCardImg";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POST_REQUEST } from "../../redux/types";
import { Spin } from "antd";

const PostCard = () => {
  const { posts, loading, postCount } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0); // 스크롤 최상단으로 이동
    dispatch({
      type: LOAD_POST_REQUEST,
      payload: 0,
    });
  }, []);

  // infinite scroll
  const skipNumberRef = useRef(0);
  const postCountRef = useRef(0);
  const endMsg = useRef(false);
  postCountRef.current = postCount - 6;

  const useOnScreen = (options) => {
    const lastPostElementRef = useRef();
    useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          let remainPostCount = postCountRef.current - skipNumberRef.current;
          if (remainPostCount >= 0) {
            dispatch({
              type: LOAD_POST_REQUEST,
              payload: skipNumberRef.current + 6,
            });
            skipNumberRef.current += 6;
          } else {
            endMsg.current = true;
          }
        }
      }, options);

      if (lastPostElementRef.current) {
        observer.observe(lastPostElementRef.current);
      }

      const lastElementReturnFunc = () => {
        if (lastPostElementRef.current) {
          observer.unobserve(lastPostElementRef.current);
        }
      };

      return lastElementReturnFunc;
    }, [lastPostElementRef, options]);

    return [lastPostElementRef];
  };
  // end infinite scroll

  const [lastPostElementRef] = useOnScreen({
    threshold: "0.9",
  });

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
      <div ref={lastPostElementRef}>{loading && <Spin size="large" />}</div>
      {loading ? (
        ""
      ) : endMsg ? (
        <div>
          <Alert
            message="마지막 포스트입니다."
            type="info"
            style={{ maxWidth: "500px" }}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PostCard;
