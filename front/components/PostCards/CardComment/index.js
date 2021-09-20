import React, { useCallback, useRef } from "react";
import { Avatar } from "antd";
import CommentForm from "../../Forms/CommentForm";
import { useRouter } from "next/router";
import useMediaQuery from "utils/useMediaQuery";
import PropTypes from "prop-types";
import { changeDate } from "utils/changeDate";
import {
  CommentsWrapper,
  CommentsCount,
  CommentList,
  CommentItem,
  CommentText,
  CommentDate,
  UserCircle,
  CommentMeta,
} from "./index.style";

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
      <CommentsCount>{comments.length}개의 댓글이 있습니다.</CommentsCount>
      <CommentList onClick={() => router.push(`/post/${post._id}`)}>
        {comments &&
          comments.map((comment) => {
            return (
              <CommentItem>
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
                <CommentText>{checkOverLength(comment.contents)}</CommentText>
                <CommentDate>{changeDate(comment.date)}</CommentDate>
              </CommentItem>
            );
          })}
        <div ref={scrollRef}></div>
      </CommentList>
      <CommentForm post={post} scrollRef={scrollRef} />
    </CommentsWrapper>
  );
};

CardComment.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CardComment;
