import { useRouter } from "next/router";
import React from "react";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return <div>{id}</div>;
};

export default Post;
