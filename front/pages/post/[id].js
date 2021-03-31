import axios from "axios";

import React from "react";

const Post = ({ post }) => {
  console.log("-----여기는 포스트----");
  console.log(post);

  return <div>{post.contents}</div>;
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
  const payload = {
    skip: 0,
    filter: "All",
    // userId
    // follows,
    // followers,
    // 일단 skip으로 요청. api추가 필요할듯
  };

  const res = await axios.get(`/api/post/skip`, { params: payload });
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
