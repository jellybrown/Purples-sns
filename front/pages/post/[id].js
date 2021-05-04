import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, Row, Button } from "antd";
import styled from "styled-components";
import MainHeader from "../../components/Header/MainHeader";
import { LightColorBg } from "../../styles/bg";
import useMediaQuery from "../../utils/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/PostSlice";
import { wrapper } from "../../redux/store";
import { getCookie, userLoading } from "../../redux/AuthSlice";
import { getPost } from "../../redux/PostSlice";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import DetailMoreModal from "../../components/Modal/DetailMoreModal";
import ImageSlide from "../../components/DetailPage/ImageSlide";
import CommentList from "../../components/DetailPage/CommentList";

const DetailPage = styled.section`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  padding-top: 60px;

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
    p {
      text-align: right;
      color: #a3a3a3;
    }
  }
  .input__wrapper {
    display: flex;
    align-items: center;
  }
  .comment__input {
    padding-top: 10px;
    margin-left: 5px;
    border: none;
    outline: none;
    flex: 1;
  }
`;

const Post = () => {
  const dispatch = useDispatch();
  const thisPost = useSelector((state) => state.post.thisPost);
  const { user } = useSelector((state) => state.auth);
  const [liked, setLiked] = useState(false);
  const [enteredFirst, setEnteredFirst] = useState(true); // 첫 페이지 접속시 scroll X
  const [text, setText] = useState("");

  const boxRef = useRef();
  const sliderRef = useRef();

  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

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

  useEffect(() => {
    if (enteredFirst) {
      sliderRef.current.scrollIntoView({ block: "start" });
    } else {
      boxRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [thisPost.comments]);

  const isMyPost = () => thisPost.writer?._id === user._id;

  return (
    <LightColorBg>
      <MainHeader />
      <DetailPage>
        <Row>
          <Col xs={24} md={11} xxl={10} ref={sliderRef}>
            <ImageSlide imageUrls={thisPost.imageUrls} />
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
                <p>{thisPost.comments?.length || 0}개의 댓글이 있습니다.</p>
                <div>
                  <CommentList thisPost={thisPost} user={user} />
                  <div className="input__wrapper">
                    <input
                      className="comment__input"
                      onChange={onChange}
                      value={text}
                      placeholder="댓글 입력..."
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
