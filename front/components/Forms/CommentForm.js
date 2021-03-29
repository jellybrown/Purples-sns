import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "../../redux/PostSlice";

const CommentForm = ({ post }) => {
  const [text, setText] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onAddComment = () => {
    dispatch(addComment({
      contents: text,
      userId: user._id,
      userName: user.name,
      id: post._id,
    }));
    setText("");
  };

  return (
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
          position: "absolute",
          bottom: "15px",
          paddingTop: "10px",
          marginLeft: "5px",
          border: "none",
          outline: "none",
          width: "90%",
        }}
      />
      <div style={{ position: "absolute", bottom: "10px", right: "-5px" }}>
        <Button type="link" onClick={onAddComment}>
          입력
        </Button>
      </div>
    </div>
  );
};

export default CommentForm;
