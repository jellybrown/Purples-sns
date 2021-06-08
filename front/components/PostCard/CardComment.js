import React, { useCallback, useRef } from "react";
import { Card, Avatar } from "antd";
import styled from "styled-components";
import CommentForm from "../Forms/CommentForm";
import { timeAgo } from "../../utils/timeAgo";
import { useRouter } from "next/router";
import useMediaQuery from "../../utils/useMediaQuery";
import { FaUserCircle } from "react-icons/fa";
import PropTypes from "prop-types";

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
    padding-top: 3px;
    padding-bottom: 0.8em;
    cursor: pointer;
    font-family: "Noto Sans KR", sans-serif;
  }
  .comment-text {
    margin-left: 1em;
    font-size: 0.75rem;
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
    font-size: 0.85rem;
  }
`;

const CardComment = ({ post }) => {
  const { comments } = post;
  const router = useRouter();
  const scrollRef = useRef(null);

  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");

  const changeMobileComment = useCallback((content) => {
    if (content.length < 7) return content;
    return content.slice(0, 6) + " ···";
  }, []);

  const changePcComment = useCallback((content) => {
    if (content.length < 19) return content;
    return content.slice(0, 18) + " ···";
  }, []);

  const checkOverLength = (content) => {
    if (isDesktopOrLaptop) return changePcComment(content);
    else return changeMobileComment(content);
  };

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
                    comment.writer.profileImageUrl ? (
                      <Avatar
                        size="small"
                        src={comment.writer.profileImageUrl}
                      />
                    ) : (
                      <FaUserCircle
                        style={{
                          display: "block",
                          width: "auto",
                          height: "24px",
                        }}
                      />
                    )
                  }
                  title={comment.writer.name}
                />
                <span className="comment-text">
                  {checkOverLength(comment.contents)}
                </span>
                <span className="comment-date">{timeAgo(comment.date)}</span>
              </li>
            );
          })}
        <div ref={scrollRef}></div>
      </ul>
      <CommentForm post={post} scrollRef={scrollRef} />
    </CommentsWrapper>
  );
};

CardComment.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CardComment;
