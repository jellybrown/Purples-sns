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
        <li>
          <span
            style={{
              fontWeight: "500",
              marginRight: "12px",
            }}
          >
            hehe
          </span>
          <span style={{ fontSize: "0.85rem" }}>어디 케이크야???</span>
        </li>
        <li>
          <span style={{ fontWeight: "500", marginRight: "12px" }}>user</span>
          <span style={{ fontSize: "0.85rem" }}>우리집 케이크^-^</span>
        </li>
        <li>
          <span style={{ fontWeight: "500", marginRight: "12px" }}>헤헷</span>
          <span style={{ fontSize: "0.85rem" }}>오~</span>
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
            bottom: "15px",
            paddingTop: "10px",
            marginLeft: "5px",
            border: "none",
            outline: "none",
            width: "90%",
          }}
        />
        <div style={{ position: "absolute", bottom: "10px", right: "6px" }}>
          <Button type="link" onClick={onAddComment}>
            입력
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardComment;
