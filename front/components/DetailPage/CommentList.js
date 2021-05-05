import { List, Avatar } from "antd";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { removeComment } from "../../redux/PostSlice";
import { timeAgo } from "../../utils/timeAgo";
import PropTypes from "prop-types";
import { FaUserCircle } from "react-icons/fa";

const CommentsWrapper = styled(List)`
  .ant-list-item-meta-title {
    margin-bottom: 0;
  }
  .ant-list-item-meta-avatar {
    height: 32px;
  }
  .ant-list-item-meta {
    align-items: center;
    flex: none;
  }
  .ant-list-item-meta-content {
    width: auto;
  }
  .ant-list-item {
    border-bottom: none !important;
  }
  .comment-item {
    flex: 1;
    display: flex;
  }
  .comment-content {
    color: #303030;
    padding-left: 10px;
    flex: 1;
  }
  .comment-date {
    font-size: 0.8em;
    color: #a3a3a3;
    margin-left: 8px;
  }
  .comment-delete {
    font-size: 0.8em;
    color: #ccc;
    border: none;
    background: none;
  }
`;

const CommentList = memo(({ thisPost, user }) => {
  const dispatch = useDispatch();
  const isMyComment = (commentId) => commentId === user._id;
  const deleteComment = (commentId) => {
    const body = {
      post: thisPost._id,
      id: commentId,
      token: user.token,
    };
    dispatch(removeComment(body));
  };
  return (
    <CommentsWrapper
      dataSource={thisPost.comments}
      renderItem={(item) => (
        <List.Item key={item._id}>
          <List.Item.Meta
            title={<span>{item.writerName}</span>}
            avatar={
              item.writer.profileImageUrl ? (
                <Avatar src={item.writer.profileImageUrl} />
              ) : (
                <FaUserCircle style={{ fontSize: "32px" }} />
              )
            }
          />
          <div className="comment-item">
            <div className="comment-content">
              <span style={{ fontSize: "0.9em" }}>{item.contents}</span>
              <span className="comment-date">{timeAgo(item.date)}</span>
            </div>
            {isMyComment(item.writer._id) ? (
              <button
                className="comment-delete"
                onClick={() => deleteComment(item._id)}
              >
                삭제
              </button>
            ) : null}
          </div>
        </List.Item>
      )}
    ></CommentsWrapper>
  );
});

CommentList.propTypes = {
  thisPost: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default CommentList;
