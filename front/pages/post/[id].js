import React, { useCallback, useEffect, useRef, useState } from "react";
import { Col, Row, Button } from "antd";
import MainHeader from "components/Header";
import { LightColorBg } from "styles/common";
import useMediaQuery from "utils/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "redux/PostSlice";
import { wrapper } from "redux/store";
import { userLoading } from "redux/AuthSlice";
import { getPost } from "redux/PostSlice";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import DetailMoreModal from "components/Modal/DetailMoreModal";
import { useRouter } from "next/router";
import {
  DetailWrapper,
  ContentsWrapper,
  Content,
  AuthorName,
  IconWrapper,
  IconItem,
  Comments,
  InputWrapper,
  Input,
} from "./index.style";
import ImageSlide from "./ImageSlide";
import CommentList from "./CommentList";
import { getCookie } from "utils/cookie";

const Post = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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
    if (!user) {
      router.push("/");
    }
  });

  useEffect(() => {
    if (enteredFirst) {
      sliderRef.current.scrollIntoView({ block: "start" });
    } else {
      boxRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [thisPost.comments]);

  const isMyPost = () => thisPost.writer?._id === user?._id;

  return (
    <LightColorBg>
      <MainHeader />
      <DetailWrapper>
        <Row>
          <Col xs={24} md={11} xxl={10} ref={sliderRef}>
            <ImageSlide imageUrls={thisPost.imageUrls} />
          </Col>
          <Col xs={24} md={13} xxl={14} style={{ background: "white" }}>
            <ContentsWrapper>
              <Content isDesktopOrLaptop={isDesktopOrLaptop}>
                <AuthorName>{thisPost.writer?.name}</AuthorName>
                <p>{thisPost.contents}</p>
                <IconWrapper>
                  {thisPost && isMyPost() ? <DetailMoreModal /> : null}
                  <IconItem>
                    {liked ? (
                      <FaHeart onClick={onToggleLike} />
                    ) : (
                      <FiHeart onClick={onToggleLike} />
                    )}
                  </IconItem>
                </IconWrapper>
              </Content>
              <Comments ref={boxRef}>
                <p>{thisPost.comments?.length || 0}개의 댓글이 있습니다.</p>
                <div>
                  <CommentList thisPost={thisPost} user={user} />
                  <InputWrapper>
                    <Input
                      onChange={onChange}
                      value={text}
                      placeholder="댓글 입력..."
                    />
                    <div>
                      <Button type="link" onClick={onAddComment}>
                        입력
                      </Button>
                    </div>
                  </InputWrapper>
                </div>
              </Comments>
            </ContentsWrapper>
          </Col>
        </Row>
      </DetailWrapper>
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
