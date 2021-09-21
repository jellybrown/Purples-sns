import { Button } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment } from "redux/PostSlice";
import PropTypes from "prop-types";
import {
  CommentInputWrapper,
  CommentInput,
  ButtonWrapper,
} from "./index.style";

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
      <CommentInput
        onChange={onChange}
        value={text}
        placeholder="댓글 입력..."
      />
      <ButtonWrapper>
        <Button type="link" onClick={onAddComment}>
          입력
        </Button>
      </ButtonWrapper>
    </CommentInputWrapper>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
  scrollRef: PropTypes.object.isRequired,
};

export default CommentForm;
