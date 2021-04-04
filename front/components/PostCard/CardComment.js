import React, { useEffect, useRef, useState } from "react";
import { Card, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { TiMinus } from "react-icons/ti";
import styled from "styled-components";
import CommentForm from "../Forms/CommentForm";
import { timeAgo } from "../../utils/timeAgo";

const StyledCommentMeta = styled(Card.Meta)`
  display: inline-flex;
  align-items: center;
  overflow: visible;
  .ant-card-meta-title {
    font-size: 0.9rem;
  }
`;

const CardCommentBox = styled.div`
  position: absolute;
  left: 0;
  top: 5px;
  width: 100%;
  min-height: 200px;
  max-height: 800px;
`;

const CommentCount = styled.p`
  font-size: 0.85rem;
  margin-bottom: 1.3em;
  margin-left: 5px;
  color: #a3a3a3;
`;

const CommentLists = styled.ul`
  height: 110px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const CommentList = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.8em;
`;

const CommentText = styled.span`
  margin-left: 1em;
  font-size: 0.8rem;
`;

const CommentDate = styled.span`
  margin-left: 20px;
  font-size: 0.7rem;
  color: #a3a3a3;
`;

const CardComment = ({ post }) => {
  const { comments } = post;
  const { token } = useSelector((state) => state.auth.user);
  const currentUser = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const checkMyComment = (comment) => {
    const result = currentUser === comment.writer._id ? true : false;
    return result;
  };

  const deleteComment = (comment) => {
    //comment id 받아서 삭제하기

    const body = {
      token,
      post,
      comment,
    };
    // dispatch({
    //   type: REMOVE_COMMENT_REQUEST,
    //   payload: body,
    // });
  };

  return (
    <CardCommentBox>
      <CommentCount>{comments.length}개의 댓글이 있습니다.</CommentCount>
      <CommentLists>
        {comments &&
          comments.map((comment) => {
            return (
              <CommentList>
                <StyledCommentMeta
                  avatar={
                    <Avatar size="small" src={comment.writer.profileImageUrl} />
                  }
                  title={comment.writer.name}
                />
                <CommentText>{comment.contents}</CommentText>
                <CommentDate>{timeAgo(comment.date)}</CommentDate>
                {checkMyComment(comment) ? (
                  <TiMinus
                    onClick={() => deleteComment(comment)}
                    style={{
                      fontSize: "1.5rem",
                      marginLeft: "3rem",
                      cursor: "pointer",
                    }}
                  />
                ) : null}
              </CommentList>
            );
          })}
      </CommentLists>
      <CommentForm post={post} />
    </CardCommentBox>
  );
};

export default CardComment;
