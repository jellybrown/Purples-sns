import React, { useCallback, useRef, useState } from "react";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { RiChat2Line, RiChat2Fill } from "react-icons/ri";
import CardComment from "./CardComment";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
import CardMoreModal from "../Modal/CardMoreModal";
import FollowModal from "../Modal/FollowModal";

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
    font-size: 0.9rem;
    padding-top: 1.3em;
    padding-left: 1em;
    cursor: pointer;
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
  const isMine = () => _id === currentUser;
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const [opendModal, setOpendModal] = useState(false);
  const contentRef = useRef();
  const router = useRouter();

  const onToggleComment = useCallback(() => {
    setCommented((prev) => !prev);
  });

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  });
  const isFollowing = () => {
    if (currentFollows.length === 0) return false;
    //  if (currentFollows.length === 1) return currentFollows[0].follow === _id;
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

export default CardContent;
