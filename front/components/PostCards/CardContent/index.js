import React, { useRef } from "react";
import ROUTES from "constants/routesPath";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { RiChat2Line, RiChat2Fill } from "react-icons/ri";
import CardComment from "../CardComment";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import CardMoreModal from "../../Modal/CardMoreModal";
import FollowModal from "../../Modal/FollowModal";
import PropTypes from "prop-types";
import useToggle from "hooks/useToggle";
import {
  ContentWrapper,
  IconWrapper,
  IconItem,
  ContentText,
} from "./index.style";

const CardContent = ({ post }) => {
  const {
    contents,
    date,
    writer: { _id, email },
  } = post;
  const { name: writerName, profileImageUrl } = post.writer;
  const currentUser = useSelector((state) => state.auth.userId); // useSelector로 내 게시글인지 가져오기
  const currentFollows = useSelector((state) => state.auth.user.follows);
  const [liked, onToggleLike] = useToggle();
  const [commented, onToggleComment] = useToggle();
  const contentRef = useRef();
  const router = useRouter();
  const isMine = () => _id === currentUser;

  const isFollowing = () => {
    if (currentFollows.length === 0) return false;
    return currentFollows.some((follows) => follows.follow._id === _id);
  };

  return (
    <ContentWrapper ref={contentRef}>
      <IconWrapper>
        <CardMoreModal
          isMine={isMine}
          writerName={writerName}
          postId={post._id}
        />
        <IconItem>
          {commented ? (
            <RiChat2Fill onClick={onToggleComment} />
          ) : (
            <RiChat2Line onClick={onToggleComment} />
          )}
        </IconItem>
        <IconItem>
          {liked ? (
            <FaHeart onClick={onToggleLike} />
          ) : (
            <FiHeart onClick={onToggleLike} />
          )}
        </IconItem>
      </IconWrapper>
      {commented ? (
        <>
          <CardComment post={post} />
        </>
      ) : (
        <>
          <FollowModal
            userId={_id}
            userEmail={email}
            userName={writerName}
            userImg={profileImageUrl}
            writeDate={date}
            isFollowing={isFollowing()}
          />
          <ContentText
            onClick={() => router.push(`${ROUTES.POST}/${post._id}`)}
          >
            {contents}
          </ContentText>
        </>
      )}
    </ContentWrapper>
  );
};

CardContent.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CardContent;
