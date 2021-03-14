import React, { useState } from "react";
import { Card, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { TiMinus } from "react-icons/ti";
import styled from "styled-components";
import CommentForm from "../Forms/CommentForm";
import { REMOVE_COMMENT_REQUEST } from "../../redux/types";

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

function time_ago(time) {
  switch (typeof time) {
    case "number":
      break;
    case "string":
      time = +new Date(time);
      break;
    case "object":
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }

  var time_formats = [
    [60, "seconds", 1], // 60
    [120, "1 minute ago", "1 minute from now"], // 60*2
    [3600, "minutes", 60], // 60*60, 60
    [7200, "1 hour ago", "1 hour from now"], // 60*60*2
    [86400, "hours", 3600], // 60*60*24, 60*60
    [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
    [604800, "days", 86400], // 60*60*24*7, 60*60*24
    [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
    [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, "Last month", "Next month"], // 60*60*24*7*4*2
    [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, "Last year", "Next year"], // 60*60*24*7*4*12*2
    [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
    [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = "ago",
    list_choice = 1;

  if (seconds == 0) {
    return "Just now";
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "from now";
    list_choice = 2;
  }
  var i = 0,
    format;
  while ((format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == "string") return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + " " + format[1] + " " + token;
    }
  return time;
}

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
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      payload: body,
    });
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
                <CommentDate>{time_ago(comment.date)}</CommentDate>
                {checkMyComment(comment) ? (
                  <TiMinus
                    onClick={deleteComment(comment)}
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
