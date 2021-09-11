import { List, Avatar } from "antd";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { removeComment } from "../../redux/PostSlice";
import PropTypes from "prop-types";
import { FaUserCircle } from "react-icons/fa";
import { changeDate } from "../../utils/changeDate";

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
          <CommentItem>
            <Content>
              <Text>{item.contents}</Text>
              <Date>{changeDate(item.date)}</Date>
            </Content>
            {isMyComment(item.writer._id) ? (
              <DeleteButton onClick={() => deleteComment(item._id)}>
                삭제
              </DeleteButton>
            ) : null}
          </CommentItem>
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

const CommentsWrapper = styled(List)`
  .ant-list-items {
    min-height: 150px;
  }
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
`;

const CommentItem = styled.div`
  flex: 1;
  display: flex;
`;

const Content = styled.div`
  color: #303030;
  padding-left: 10px;
  flex: 1;
`;

const Text = styled.span`
  font-size: 0.9em;
`;

const Date = styled.span`
  font-size: 0.8em;
  color: #a3a3a3;
  margin-left: 8px;
`;

const DeleteButton = styled.button`
  font-size: 0.8em;
  margin-left: 0.6em;
  color: #ccc;
  border: none;
  background: none;
`;
