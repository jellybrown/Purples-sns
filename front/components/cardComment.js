import { Button, Card, Avatar } from "antd";
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
        height: "500px",
        padding: "0 1.3em",
      }}
    >
      <p
        style={{
          fontSize: "0.85rem",
          marginBottom: "2em",
          marginLeft: "5px",
          color: "#A3A3A3",
        }}
      >
        3개의 댓글이 있습니다.
      </p>
      <ul>
        <li
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.8em",
          }}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="user1"
            style={{ display: "inline-flex", alignItems: "center" }}
          />

          <span style={{ marginLeft: "1em", fontSize: "0.85rem" }}>
            어디 케이크야???
          </span>
          <span
            style={{ marginLeft: "20px", fontSize: "0.8rem", color: "#A3A3A3" }}
          >
            1일 전
          </span>
        </li>
        <li
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.8em",
          }}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="usersdasdad"
            style={{ display: "inline-flex", alignItems: "center" }}
          />

          <span style={{ marginLeft: "1em", fontSize: "0.85rem" }}>
            어디 케이크야vddsfs???
          </span>
          <span
            style={{ marginLeft: "20px", fontSize: "0.8rem", color: "#A3A3A3" }}
          >
            1일 전
          </span>
        </li>
        <li
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "0.8em",
          }}
        >
          <Card.Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="userasdasa"
            style={{ display: "inline-flex", alignItems: "center" }}
          />

          <span style={{ marginLeft: "1em", fontSize: "0.85rem" }}>
            어디 케이dfdsfs크야???
          </span>
          <span
            style={{ marginLeft: "20px", fontSize: "0.8rem", color: "#A3A3A3" }}
          >
            1일 전
          </span>
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
