import { Col, Row } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import MainHeader from "../components/Header/MainHeader";
import { getCookie, userLoading } from "../redux/AuthSlice";
import { wrapper } from "../redux/store";
import { LightColorBg } from "../styles/bg";

// 상세페이지 테스트
const Test = () => {
  const post = useSelector((state) => state.post.posts[0]);
  // console.log(post);
  return (
    <LightColorBg>
      <MainHeader />
      <Row>
        <Col xs={24} md={10} lg={8}>
          {/* <img src={post.imageUrls[0]} /> */}
        </Col>
        <Col xs={24} md={14} lg={16}>
          <div>안녕?</div>
        </Col>
      </Row>
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
      props: context.store.getState().auth,
    };
    // context.store.dispatch({
    //   type: LOAD_POSTS_REQUEST,
    // });
  }
);

export default Test;
