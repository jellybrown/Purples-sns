import React, { useRef } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { RiChat2Line, RiChat2Fill } from "react-icons/ri";
import CardComment from "./CardComment";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
import CardMoreModal from "../Modal/CardMoreModal";
import FollowModal from "../Modal/FollowModal";
import PropTypes from "prop-types";
import useToggle from "../../hooks/useToggle";

const ContentWrapper = styled.div`
  position: relative;
  min-height: 200px;
  height: 50%;
  max-height: 800px;
  overflow: hidden;

  .icon__wrapper {
    z-index: 2;
    position: absolute;
    right: 0;
    font-size: 1.4rem;
  }
  .icon-item {
    margin-left: 0.5em;
    cursor: pointer;
  }
  .writer-name {
    font-size: 0.9rem;
    margin-left: 1em;
    font-weight: 500;
  }
  .pub-date {
    font-size: 0.7rem;
    margin-left: 1em;
    color: #a3a3a3;
  }
  .text {
    font-size: 0.85rem;
    padding-top: 1.3em;
    padding-left: 1em;
    cursor: pointer;
    font-family: "Noto Sans KR", sans-serif;
  }
`;

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
      <div className="icon__wrapper">
        <CardMoreModal
          isMine={isMine}
          writerName={writerName}
          postId={post._id}
        />
        <span className="icon-item">
          {commented ? (
            <RiChat2Fill onClick={onToggleComment} />
          ) : (
            <RiChat2Line onClick={onToggleComment} />
          )}
        </span>
        <span className="icon-item">
          {liked ? (
            <FaHeart onClick={onToggleLike} />
          ) : (
            <FiHeart onClick={onToggleLike} />
          )}
        </span>
      </div>
      {commented ? (
        <>
          <CardComment post={post} />
        </>
      ) : (
        <div>
          <FollowModal
            userId={_id}
            userEmail={email}
            userName={writerName}
            userImg={profileImageUrl}
            writeDate={date}
            isFollowing={isFollowing()}
          />
          <div
            className="text"
            onClick={() => router.push(`/post/${post._id}`)}
          >
            {contents}
          </div>
        </div>
      )}
    </ContentWrapper>
  );
};

CardContent.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CardContent;
