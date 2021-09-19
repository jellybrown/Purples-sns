import { List, Avatar } from "antd";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { removeComment } from "redux/PostSlice";
import PropTypes from "prop-types";
import { FaUserCircle } from "react-icons/fa";
import { changeDate } from "utils/changeDate";
import {
  CommentsWrapper,
  CommentItem,
  Content,
  Text,
  Date,
  DeleteButton,
} from "./index.style";

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
