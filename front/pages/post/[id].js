import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { List, Col, Row, Avatar, Button } from "antd";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import MainHeader from "../../components/Header/MainHeader";
import { LightColorBg } from "../../styles/bg";
import useMediaQuery from "../../utils/useMediaQuery";
import { NextArrow, PrevArrow } from "../../styles/slickArrow";
import { AiOutlineUser } from "react-icons/ai";
import { timeAgo } from "../../utils/timeAgo";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getAllPost } from "../../redux/PostSlice";
import { useRouter } from "next/router";
import { wrapper } from "../../redux/store";
import { getCookie, userLoading } from "../../redux/AuthSlice";
import { getPost } from "../../redux/PostSlice";

const DetailPage = styled.section`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  padding-top: 60px;

  .contents {
    height: 500px;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }
  .slick-dots {
    color: rgba(0, 0, 0, 0.3);
    li.slick-active {
      color: rgba(0, 0, 0, 0.5);
    }
  }
  .ant-btn {
    padding: 0;
  }
`;

const StyledList = styled(List)`
  .ant-list-item-meta-title {
    margin-bottom: 0;
  }
  .ant-list-item-meta {
    align-items: center;
    flex: none;
  }
  .ant-list-item-meta-content {
    width: auto;
  }
  .comment__item {
    flex: 1;
    display: flex;
  }
  .comment__content {
    color: #303030;
    padding-left: 10px;
    flex: 1;
  }
  .comment__delete {
    font-size: 0.8em;
    color: #ccc;
    border: none;
    background: none;
  }
  .ant-list-item {
    border-bottom: none !important;
  }
`;

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 500px;
`;

const Post = () => {
  const router = useRouter();
  // const thisPost = useSelector((state) => state.post.posts).filter(
  //   (post) => post._id === id
  // );
  const thisPost = useSelector((state) => state.post.thisPost);

  useEffect(() => {
    dispatch(
      getPost({
        id: router.query.id,
      })
    );
  }, []);

  const boxRef = useRef();

  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");
  const isTabletOrMobileDevice = useMediaQuery("(max-device-width: 1224px)");
  const [currentSlide, setCurrentSlide] = useState(0);

  const [text, setText] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onAddComment = () => {
    console.log("---ON ADD------");
    console.log(thisPost);
    dispatch(
      addComment({
        contents: text,
        userId: user._id,
        userName: user.name,
        id: thisPost._id,
      })
    );
    setText("");
  };

  useEffect(() => {
    console.log("---this post----");
    console.log(thisPost);
  }, [thisPost]);

  useEffect(() => {
    boxRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [thisPost.comments]);

  const isMyPost = () => thisPost.writer._id === user._id;
  const isMyComment = (commentId) => commentId === user._id;

  return (
    <LightColorBg>
      <MainHeader />
      <DetailPage>
        <Row>
          <Col xs={24} md={11} xxl={10}>
            <section
              style={{
                width: "100%",
                paddingTop: isDesktopOrLaptop ? 0 : "250px",
                height: isDesktopOrLaptop ? "500px" : "700px",
                background: "white",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Slick
                dots={true}
                beforeChange={(slide) => setCurrentSlide(slide)}
                initialSlide={0}
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={false}
                nextArrow={
                  <NextArrow onClick={(slide) => setCurrentSlide(slide + 1)} />
                }
                prevArrow={
                  <PrevArrow onClick={(slide) => setCurrentSlide(slide - 1)} />
                }
              >
                {thisPost.imageUrls?.map((img) => (
                  <Wrapper key={img}>
                    <img
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%,-50%)",
                        minHeight: "100%",
                        minWidth: "100%",
                        maxHeight: isDesktopOrLaptop ? "600px" : "500px",
                        maxWidth: "600px",
                      }}
                      src={img}
                    />
                  </Wrapper>
                ))}
              </Slick>
            </section>
          </Col>
          <Col xs={24} md={13} xxl={14} style={{ background: "white" }}>
            <section className="contents">
              <article
                style={{
                  padding: "2em",
                  height: isDesktopOrLaptop ? "300px" : "250px",
                  borderBottom: "1px solid #f0f0f0",
                }}
              >
                <div>{thisPost.contents}</div>
                <div>아이콘영역</div>
              </article>
              <article style={{ padding: "1em 2em" }} ref={boxRef}>
                <p style={{ textAlign: "right", color: "#a3a3a3" }}>
                  {thisPost.comments?.length || 0}개의 댓글이 있습니다.
                </p>
                <div>
                  <StyledList
                    dataSource={thisPost?.comments}
                    renderItem={(item) => (
                      <List.Item key={item._id}>
                        <List.Item.Meta
                          title={<span>{item.writerName}</span>}
                          avatar={<Avatar icon={<AiOutlineUser />} />}
                        />
                        <div className="comment__item">
                          <div className="comment__content">
                            <span style={{ fontSize: "0.9em" }}>
                              {item.contents}
                            </span>
                            <span
                              style={{
                                fontSize: "0.8em",
                                color: "#a3a3a3",
                                marginLeft: "8px",
                              }}
                            >
                              {timeAgo(item.date)}
                            </span>
                          </div>
                          {isMyComment(item.writer._id) ? (
                            <button className="comment__delete">삭제</button>
                          ) : null}
                        </div>
                      </List.Item>
                    )}
                  ></StyledList>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      onChange={onChange}
                      value={text}
                      placeholder="댓글 입력..."
                      style={{
                        paddingTop: "10px",
                        marginLeft: "5px",
                        border: "none",
                        outline: "none",
                        flex: "1",
                      }}
                    />
                    <div style={{}}>
                      <Button type="link" onClick={onAddComment}>
                        입력
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          </Col>
        </Row>
      </DetailPage>
    </LightColorBg>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    console.log("getserversideProps-------");
    const token = getCookie("token", context.req);
    if (token !== undefined && token !== null) {
      await context.store.dispatch(userLoading(token));
    }

    return {
      props: context.store.getState(),
      //  props: context.store.getState().auth,
      //props: context.store.getState().post,
    };
  }
);

export default Post;
