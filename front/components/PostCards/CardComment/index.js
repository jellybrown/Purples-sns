import React, { useCallback, useRef } from "react";
import ROUTES from "constants/routesPath";
import { Avatar } from "antd";
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
import { sliceComment } from "utils/sliceComment";
import CommentForm from "../CommentForm";

const CardComment = ({ post }) => {
  const { comments } = post;
  const router = useRouter();
  const scrollRef = useRef(null);

  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");

  const PC_COMMENT_MAX_LENGTH = 19;
  const M_COMMENT_MAX_LENGTH = 15;

  const checkOverLength = (content) => {
    if (isDesktopOrLaptop) return sliceComment(content, PC_COMMENT_MAX_LENGTH);
    else return sliceComment(content, M_COMMENT_MAX_LENGTH);
  };

  return (
    <CommentsWrapper>
      <CommentsCount>{comments.length}개의 댓글이 있습니다.</CommentsCount>
      <CommentList onClick={() => router.push(`${ROUTES.POST}/${post._id}`)}>
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
