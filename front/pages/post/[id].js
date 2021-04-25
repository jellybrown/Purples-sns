import React, { useCallback, useEffect, useRef, useState } from "react";
import { List, Col, Row, Avatar, Button } from "antd";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import MainHeader from "../../components/Header/MainHeader";
import { LightColorBg } from "../../styles/bg";
import useMediaQuery from "../../utils/useMediaQuery";
import { NextArrow, PrevArrow } from "../../styles/slickArrow";
import { timeAgo } from "../../utils/timeAgo";
import { useDispatch, useSelector } from "react-redux";
import { addComment, removeComment } from "../../redux/PostSlice";
import { wrapper } from "../../redux/store";
import { getCookie, userLoading } from "../../redux/AuthSlice";
import { getPost } from "../../redux/PostSlice";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import DetailMoreModal from "../../components/Modal/DetailMoreModal";

const DetailPage = styled.section`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  padding-top: 60px;
  .image__slider {
    width: 100%;
    background: white;
    overflow: hidden;
    position: relative;
    padding-top: 60px;
  }
  .contents__wrapper {
    height: 500px;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }
  .content {
    border-bottom: 1px solid #f0f0f0;
    padding: 2em;
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
  .image__wrapper {
    overflow: hidden;
    position: relative;
    height: 500px;
  }
  .image {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-height: 100%;
    min-width: 100%;
    max-width: 600px;
  }
  .content {
    position: relative;
  }
  .writer {
    text-align: right;
    font-weight: 500;
  }
  .icon__wrapper {
    z-index: 2;
    position: absolute;
    right: 1em;
    bottom: 0.5em;
    font-size: 1.4rem;
  }
  .icon-item {
    margin-left: 0.5em;
    cursor: pointer;
  }
  .comments {
    padding: 1em 2em;
  }
`;

const CommentList = styled(List)`
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
  .ant-list-item {
    border-bottom: none !important;
  }
  .comment-item {
    flex: 1;
    display: flex;
  }
  .comment-content {
    color: #303030;
    padding-left: 10px;
    flex: 1;
  }
  .comment-date {
    font-size: 0.8em;
    color: #a3a3a3;
    margin-left: 8px;
  }
  .comment-delete {
    font-size: 0.8em;
    color: #ccc;
    border: none;
    background: none;
  }
`;

const Post = () => {
  const thisPost = useSelector((state) => state.post.thisPost);
  const { token } = useSelector((state) => state.auth.user);
  const [liked, setLiked] = useState(false);
  const [enteredFirst, setEnteredFirst] = useState(true); // 첫 페이지 접속시 scroll X

  const boxRef = useRef();
  const sliderRef = useRef();

  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");
  const isTabletOrMobileDevice = useMediaQuery("(max-device-width: 1224px)");
  const [currentSlide, setCurrentSlide] = useState(0);

  const [text, setText] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  });

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onAddComment = () => {
    setEnteredFirst(false);
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

  const deleteComment = (commentId) => {
    const body = {
      post: thisPost._id,
      id: commentId,
      token,
    };
    dispatch(removeComment(body));
  };

  useEffect(() => {
    if (enteredFirst) {
      sliderRef.current.scrollIntoView({ block: "start" });
    } else {
      boxRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [thisPost.comments]);

  const isMyPost = () => thisPost.writer?._id === user._id;
  const isMyComment = (commentId) => commentId === user._id;

  return (
    <LightColorBg>
      <MainHeader />
      <DetailPage>
        <Row>
          <Col xs={24} md={11} xxl={10} ref={sliderRef}>
            <section
              className="image__slider"
              style={{
                paddingTop: isDesktopOrLaptop ? 0 : "260px",
                height: isDesktopOrLaptop ? "500px" : "700px",
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
                  <div className="image__wrapper" key={img}>
                    <img
                      className="image"
                      src={img}
                      style={{
                        maxHeight: isDesktopOrLaptop ? "600px" : "500px",
                      }}
                    />
                  </div>
                ))}
              </Slick>
            </section>
          </Col>
          <Col xs={24} md={13} xxl={14} style={{ background: "white" }}>
            <section className="contents__wrapper">
              <article
                className="content"
                style={{
                  height: isDesktopOrLaptop ? "300px" : "250px",
                }}
              >
                <p className="writer">{thisPost.writer?.name}</p>
                <p>{thisPost.contents}</p>
                <div className="icon__wrapper">
                  {thisPost && isMyPost() ? <DetailMoreModal /> : null}
                  <span className="icon-item">
                    {liked ? (
                      <FaHeart onClick={onToggleLike} />
                    ) : (
                      <FiHeart onClick={onToggleLike} />
                    )}
                  </span>
                </div>
              </article>
              <article className="comments" ref={boxRef}>
                <p style={{ textAlign: "right", color: "#a3a3a3" }}>
                  {thisPost.comments?.length || 0}개의 댓글이 있습니다.
                </p>
                <div>
                  <CommentList
                    dataSource={thisPost?.comments}
                    renderItem={(item) => (
                      <List.Item key={item._id}>
                        <List.Item.Meta
                          title={<span>{item.writerName}</span>}
                          avatar={<Avatar src={item.writer.profileImageUrl} />}
                        />
                        <div className="comment-item">
                          <div className="comment-content">
                            <span style={{ fontSize: "0.9em" }}>
                              {item.contents}
                            </span>
                            <span className="comment-date">
                              {timeAgo(item.date)}
                            </span>
                          </div>
                          {isMyComment(item.writer._id) ? (
                            <button
                              className="comment-delete"
                              onClick={() => deleteComment(item._id)}
                            >
                              삭제
                            </button>
                          ) : null}
                        </div>
                      </List.Item>
                    )}
                  ></CommentList>
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
                    <div>
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
    const token = getCookie("token", context.req);
    if (token !== undefined && token !== null) {
      await context.store.dispatch(userLoading(token));
      await context.store.dispatch(getPost({ id: context.params.id }));
    }

    return {
      props: context.store.getState(),
    };
  }
);

export default Post;
