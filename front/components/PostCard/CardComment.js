import React, { useState } from "react";
import { Card, Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import CommentForm from "../Forms/CommentForm";

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
  const { wrtier, comments } = post;
  // comments.map(comment => (
  //   <li>댓글 돌려서 렌더링</li>
  // ))
  return (
    <CardCommentBox>
      {console.log(comments)}
      <CommentCount>3개의 댓글이 있습니다.</CommentCount>
      <CommentLists>
        <CommentList>
          <StyledCommentMeta
            avatar={<Avatar size="small" src="https://picsum.photos/20" />}
            title="user1"
          />
          <CommentText>어디 케이크fdv디 케이크f</CommentText>
          <CommentDate>1일 전</CommentDate>
        </CommentList>
        <CommentList>
          <StyledCommentMeta
            avatar={<Avatar size="small" src="https://picsum.photos/20" />}
            title="user1"
          />
          <CommentText>어디 케이dfsdfsd크야???</CommentText>
          <CommentDate>1일 전</CommentDate>
        </CommentList>
        <CommentList>
          <StyledCommentMeta
            avatar={<Avatar size="small" src="https://picsum.photos/20" />}
            title="ua히힣"
          />
          <CommentText>어디 케이크야???</CommentText>
          <CommentDate>1일 전</CommentDate>
        </CommentList>
        <CommentList>
          <StyledCommentMeta
            avatar={<Avatar size="small" src="https://picsum.photos/20" />}
            title="user1"
          />
          <CommentText>어디 케이크야???</CommentText>
          <CommentDate>1일 전</CommentDate>
        </CommentList>
        <CommentList>
          <StyledCommentMeta
            avatar={<Avatar size="small" src="https://picsum.photos/20" />}
            title="user1"
          />
          <CommentText>어디 케이크야???</CommentText>
          <CommentDate>1일 전</CommentDate>
        </CommentList>
        <CommentList>
          <StyledCommentMeta
            avatar={<Avatar size="small" src="https://picsum.photos/20" />}
            title="user1"
          />
          <CommentText>어디 케이크야???</CommentText>
          <CommentDate>1일 전</CommentDate>
        </CommentList>
        <CommentList>
          <StyledCommentMeta
            avatar={<Avatar size="small" src="https://picsum.photos/20" />}
            title="user1"
          />
          <CommentText>어디 케이크야???</CommentText>
          <CommentDate>1일 전</CommentDate>
        </CommentList>
      </CommentLists>
      <CommentForm post={post} />
    </CardCommentBox>
  );
};

export default CardComment;
