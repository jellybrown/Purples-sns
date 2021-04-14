import React from "react";
import { Card, Avatar } from "antd";
import styled from "styled-components";
import CommentForm from "../Forms/CommentForm";
import { timeAgo } from "../../utils/timeAgo";
import { useRouter } from "next/router";

const CommentsWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 5px;
  width: 100%;
  min-height: 200px;
  max-height: 800px;
  .comment-count {
    font-size: 0.85rem;
    margin-bottom: 1.3em;
    margin-left: 5px;
    color: #a3a3a3;
  }
  .comment-list {
    height: 110px;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  }
  .comment-item {
    display: flex;
    align-items: center;
    margin-bottom: 0.8em;
    cursor: pointer;
  }
  .comment-text {
    margin-left: 1em;
    font-size: 0.8rem;
  }
  .comment-date {
    margin-left: 20px;
    font-size: 0.7rem;
    color: #a3a3a3;
  }
`;

const CommentMeta = styled(Card.Meta)`
  display: inline-flex;
  align-items: center;
  overflow: visible;
  .ant-card-meta-title {
    font-size: 0.9rem;
  }
`;

const CardComment = ({ post }) => {
  const { comments } = post;
  const router = useRouter();

  return (
    <CommentsWrapper>
      <p className="comment-count">{comments.length}개의 댓글이 있습니다.</p>
      <ul
        className="comment-list"
        onClick={() => router.push(`/post/${post._id}`)}
      >
        {comments &&
          comments.map((comment) => {
            return (
              <li className="comment-item">
                <CommentMeta
                  avatar={
                    <Avatar size="small" src={comment.writer.profileImageUrl} />
                  }
                  title={comment.writer.name}
                />
                <span className="comment-text">{comment.contents}</span>
                <span className="comment-date">{timeAgo(comment.date)}</span>
              </li>
            );
          })}
      </ul>
      <CommentForm post={post} />
    </CommentsWrapper>
  );
};

export default CardComment;
