import React, { useEffect, useRef } from "react";
import "antd/dist/antd.css";
import CardContent from "./CardContent";
import CardImage from "./CardImage";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { loadPost } from "../../redux/PostSlice";
import { LoadingOutlined } from "@ant-design/icons";
import useMediaQuery from "../../utils/useMediaQuery";
import {
  CardWrapper,
  CustomCard,
  SpinnerWrapper,
  AlertWrapper,
  CustomAlert,
} from "./index.style";

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
        <CustomCard
          isDesktopOrLaptop={isDesktopOrLaptop}
          key={post._id}
          cover={<CardImage images={post.imageUrls} />}
        >
          <CardContent post={post} />
        </CustomCard>
      ))}
      <SpinnerWrapper ref={lastPostElementRef}>
        {<Spin indicator={antIcon} />}
      </SpinnerWrapper>
      {loading ? (
        ""
      ) : endMsg ? (
        <AlertWrapper>
          <CustomAlert message="마지막 포스트입니다." type="info" />
        </AlertWrapper>
      ) : (
        ""
      )}
    </CardWrapper>
  );
};

export default PostCards;
