import React, { useCallback, useRef } from "react";
import { Card, Avatar } from "antd";
import styled from "styled-components";
import CommentForm from "../Forms/CommentForm";
import { useRouter } from "next/router";
import useMediaQuery from "../../utils/useMediaQuery";
import { FaUserCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { changeDate } from "../../utils/changeDate";

const CardComment = ({ post }) => {
  const { comments } = post;
  const router = useRouter();
  const scrollRef = useRef(null);

  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");

  const changeMobileComment = useCallback((content) => {
    if (content.length < 15) return content;
    return content.slice(0, 14) + " ...";
  }, []);

  const changePcComment = useCallback((content) => {
    if (content.length < 19) return content;
    return content.slice(0, 18) + " ...";
  }, []);

  const checkOverLength = (content) => {
    if (isDesktopOrLaptop) return changePcComment(content);
    else return changeMobileComment(content);
  };

  return (
    <CommentsWrapper>
      <Count>{comments.length}개의 댓글이 있습니다.</Count>
      <List onClick={() => router.push(`/post/${post._id}`)}>
        {comments &&
          comments.map((comment) => {
            return (
              <Item>
                <CommentMeta
                  avatar={
                    comment.writer.profileImageUrl ? (
                      <Avatar
                        size="small"
                        src={comment.writer.profileImageUrl}
                      />
                    ) : (
                      <UserCircle />
                    )
                  }
                  title={comment.writer.name}
                />
                <Text>{checkOverLength(comment.contents)}</Text>
                <Date>{changeDate(comment.date)}</Date>
              </Item>
            );
          })}
        <div ref={scrollRef}></div>
      </List>
      <CommentForm post={post} scrollRef={scrollRef} />
    </CommentsWrapper>
  );
};

CardComment.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CardComment;

const Count = styled.p`
  font-size: 0.85rem;
  margin-bottom: 1.3em;
  margin-left: 5px;
  color: #a3a3a3;
`;

const List = styled.ul`
  height: 110px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  padding-top: 3px;
  padding-bottom: 0.8em;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
`;

const Text = styled.span`
  margin-left: 1em;
  font-size: 0.75rem;
`;

const Date = styled.span`
  margin-left: 20px;
  font-size: 0.7rem;
  color: #a3a3a3;
`;

const UserCircle = styled(FaUserCircle)`
  display: block;
  width: auto;
  height: 24px;
`;

const CommentsWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 5px;
  width: 100%;
  min-height: 200px;
  max-height: 800px;

  .ant-card-meta-avatar {
    padding-right: 11px;
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
