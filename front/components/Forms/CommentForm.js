import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../../redux/types";

const CommentForm = () => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  const onChange = (e) => {
    setText(e.target.value);
    console.log(comment);
  };

  const onAddComment = () => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      payload: text,
    });
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
