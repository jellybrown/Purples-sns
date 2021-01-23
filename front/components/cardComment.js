import { Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../redux/types";

const CardComment = () => {
  const [comment, setComment] = useState("");

  const onChange = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };

  const dispatch = useDispatch();
  const onAddComment = () => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      payload: comment,
    });
  };

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: "5px",
        width: "100%",
        height: "100%",
        padding: "0 1.3em",
      }}
    >
      <p
        style={{
          fontSize: "0.8rem",
          fontWeight: "500",
          marginLeft: "5px",
          color: "#A3A3A3",
        }}
      >
        3개의 댓글
      </p>
      <ul>
        <li style={{ marginBottom: "5px" }}>
          <span
            style={{
              fontWeight: "500",
              marginRight: "10px",
            }}
          >
            hehe
          </span>
          <span style={{ fontWeight: "300", fontSize: "0.8rem" }}>
            어디 케이크야???
          </span>
        </li>
        <li style={{ marginBottom: "5px" }}>
          <span style={{ fontWeight: "500", marginRight: "10px" }}>user</span>
          <span style={{ fontWeight: "300", fontSize: "0.8rem" }}>
            우리집 케이크^-^
          </span>
        </li>
        <li style={{ marginBottom: "5px" }}>
          <span style={{ fontWeight: "500", marginRight: "10px" }}>헤헷</span>
          <span style={{ fontWeight: "300", fontSize: "0.8rem" }}>오~</span>
        </li>
      </ul>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          onChange={onChange}
          value={comment}
          placeholder="댓글 입력..."
          style={{
            position: "absolute",
            bottom: "10px",
            paddingTop: "10px",
            marginLeft: "5px",
            border: "none",
            outline: "none",
            width: "90%",
          }}
        />
        <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
          <Button type="submit" onClick={onAddComment}>
            입력
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardComment;
