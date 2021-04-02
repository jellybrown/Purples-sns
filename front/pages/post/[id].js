import React, { useEffect, useState } from "react";
import axios from "axios";
import { List, Card, Col, Row, Avatar, Button } from "antd";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import MainHeader from "../../components/Header/MainHeader";
import { LightColorBg } from "../../styles/bg";
import useMediaQuery from "../../utils/useMediaQuery";
import { NextArrow, PrevArrow } from "../../styles/slickArrow";
import { AiOutlineUser } from "react-icons/ai";
import { FiDivide } from "react-icons/fi";
import { timeAgo } from "../../utils/timeAgo";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/PostSlice";

const StylePC = styled.section`
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
`;
const StyleMobile = styled.section`
  text-align: left;
`;

const StyledList = styled(List)`
  .ant-list-item-meta-title {
    margin-bottom: 0;
  }
  .ant-list-item-meta {
    align-items: center;
  }
  .ant-list-item-meta-content {
    width: auto;
  }
  .comment__content {
    color: #303030;
    padding-left: 10px;
    flex: 1;
    display: flex;
    justify-content: space-between;
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

const Post = ({ post }) => {
  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");
  const isTabletOrMobileDevice = useMediaQuery("(max-device-width: 1224px)");
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    console.log("curr", currentSlide);
  }, [currentSlide]);
  console.log(post);

  const [text, setText] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onAddComment = () => {
    dispatch(
      addComment({
        contents: text,
        userId: user._id,
        userName: user.name,
        id: post._id,
      })
    );
    setText("");
  };

  return (
    <LightColorBg>
      <MainHeader />
      {isDesktopOrLaptop && (
        <StylePC>
          <Row>
            <Col xs={24} md={11} xxl={10}>
              <section
                style={{
                  width: "100%",
                  height: "500px",
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
                    <NextArrow
                      onClick={(slide) => setCurrentSlide(slide + 1)}
                    />
                  }
                  prevArrow={
                    <PrevArrow
                      onClick={(slide) => setCurrentSlide(slide - 1)}
                    />
                  }
                >
                  {post.imageUrls.map((img) => (
                    <Wrapper key={img}>
                      <img
                        style={{
                          position: "absolute",

                          left: "50%",
                          top: "50%",
                          transform: "translate(-50%,-50%)",
                          minHeight: "100%",
                          minWidth: "100%",
                          maxHeight: "600px",
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
                    height: "300px",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <div>{post.contents}</div>
                  <div>아이콘영역</div>
                </article>
                <article style={{ padding: "1em 2em" }}>
                  <p style={{ textAlign: "right", color: "#a3a3a3" }}>
                    {post.comments.length || 0}개의 댓글이 있습니다.
                  </p>
                  <div>
                    <StyledList
                      dataSource={post.comments}
                      renderItem={(item) => (
                        <List.Item key={item._id}>
                          <List.Item.Meta
                            title={<span>{item.writerName}</span>}
                            avatar={<Avatar icon={<AiOutlineUser />} />}
                          />
                          <div className="comment__content">
                            <span>{item.contents}</span>
                            <span
                              style={{ fontSize: "0.8em", color: "#a3a3a3" }}
                            >
                              {timeAgo(item.date)}
                            </span>
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
                        }}
                      />
                      <div style={{}}>
                        <Button type="link" onClick={onAddComment}>
                          입력
                        </Button>
                      </div>
                    </div>
                    {/* {post.comments.map((comment) => (
                      <Card></Card>
                      <Card.Meta
                        avatar={
                          <Avatar
                            size="small"
                            /src={comment.writer.profileImageUrl}
                            icon={<AiOutlineUser />}
                          />
                        }
                        title={comment.writerName}
                      />
                    ))} */}
                  </div>
                </article>
              </section>
            </Col>
          </Row>
        </StylePC>
      )}
      {isTabletOrMobileDevice && (
        <StyleMobile>
          <Row>
            <Col xs={24} md={11} xxl={10}>
              <div
                style={{
                  width: "100%",
                  height: "500px",
                  overflow: "hidden",
                  background: "white",
                }}
              >
                <img style={{ width: "100%" }} src={post.imageUrls[0]} />
              </div>
            </Col>
            <Col
              xs={24}
              md={13}
              xxl={14}
              style={{ background: "white", background: "white" }}
            >
              <div style={{ height: "500px" }}>{post.contents}</div>
            </Col>
          </Row>
        </StyleMobile>
      )}
    </LightColorBg>
  );
};

export const getStaticProps = async (context) => {
  // 이 context가 path일 것이다.
  const res = await axios.get(`/api/post/${context.params.id}`);

  console.log("---- page 상세정보 ---");
  console.log(res.data);
  return {
    props: {
      post: res.data,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await axios.get(`/api/post`);
  console.log("getss---------");
  const posts = res.data.postFindResult;

  const idArray = posts.map((post) => post._id);
  console.log("--- id Array ------");
  console.log(idArray);
  const paths = idArray.map((id) => ({ params: { id } })); //paths = params.id의 배열
  // id가 문자열이라 toString 사용
  // paths가 배열임을 기억하자
  console.log("paths", paths);
  return {
    paths,
    fallback: false, // false: 없는 페이지 요청시 404, true: 무조건 페이지 반환
  };
};

export default Post;
