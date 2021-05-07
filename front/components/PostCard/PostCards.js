import React, { useEffect, useRef } from "react";
import "antd/dist/antd.css";
import { Alert, Card } from "antd";
import CardContent from "./CardContent";
import PostCardImg from "./PostCardImg";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { loadPost } from "../../redux/PostSlice";
import { LoadingOutlined } from "@ant-design/icons";
import styled from "styled-components";
import useMediaQuery from "../../utils/useMediaQuery";

const CardWrapper = styled.div`
  width: 100%;
  .post-card {
    max-width: 500px;
    width: 93%;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.05);
    margin-bottom: 70px;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
  }
`;

const PostCards = () => {
  const { posts, loading, postCount, postFilter } = useSelector(
    (state) => state.post
  );
  const { userId, follows, followers } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");

  const getActiveFilterName = () => {
    const activeFilter = postFilter.filter((menu) => menu.active);
    return activeFilter[0].name;
  };

  const antIcon = (
    <LoadingOutlined style={{ fontSize: 80, color: "#aab2e3" }} spin />
  );

  // post filter가 변경됐을 때의 콜백
  useEffect(() => {
    window.scrollTo(0, 0);
    const payload = {
      skip: 0,
      filter: getActiveFilterName(),
      userId,
      follows,
      followers,
    };
    dispatch(loadPost({ payload }));
  }, [postFilter]);

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
            let payload = {
              skip: skipNumberRef.current + 6,
              filter: getActiveFilterName(),
              userId,
              follows,
              followers,
            };
            dispatch(loadPost({ payload }));
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
    <CardWrapper>
      {posts.map((post) => (
        <Card
          className="post-card"
          style={{ margin: !isDesktopOrLaptop && "0 auto 50px" }}
          key={post._id}
          cover={<PostCardImg images={post.imageUrls} />}
        >
          <CardContent post={post} />
        </Card>
      ))}
      <div
        ref={lastPostElementRef}
        style={{ textAlign: "center", maxWidth: "500px", padding: "50px 0" }}
      >
        {<Spin indicator={antIcon} />}
      </div>
      {loading ? (
        ""
      ) : endMsg ? (
        <div>
          <Alert
            message="마지막 포스트입니다."
            type="info"
            style={{
              maxWidth: "500px",
              minWidth: "140px",
              width: "93%",
              fontFamily: "Noto Sans KR",
              fontSize: "12px",
            }}
          />
        </div>
      ) : (
        ""
      )}
    </CardWrapper>
  );
};

export default PostCards;
