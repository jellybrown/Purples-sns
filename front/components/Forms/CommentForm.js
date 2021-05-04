import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addComment } from "../../redux/PostSlice";
import PropTypes from "prop-types";

const CommentInputWrapper = styled.div`
  display: flex;
  align-items: center;

  .card-comment__input {
    position: absolute;
    bottom: 15px;
    padding-top: 10px;
    margin-left: 5px;
    border: none;
    outline: none;
    width: 90%;
  }
  .btn__wrapper {
    position: absolute;
    bottom: 10px;
    right: -5px;
  }
`;

const CommentForm = ({ post, scrollRef }) => {
  const [text, setText] = useState("");
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onAddComment = async () => {
    await dispatch(
      addComment({
        contents: text,
        userId: user._id,
        userName: user.name,
        id: post._id,
      })
    );
    setText("");

    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <CommentInputWrapper>
      <input
        onChange={onChange}
        value={text}
        placeholder="댓글 입력..."
        className="card-comment__input"
      />
      <div className="btn__wrapper">
        <Button type="link" onClick={onAddComment}>
          입력
        </Button>
      </div>
    </CommentInputWrapper>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
