import React, { useCallback, useRef, useState } from "react";
import { FiHeart, FiMoreHorizontal } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { RiChat2Line, RiChat2Fill } from "react-icons/ri";
import CardComment from "./CardComment";
import { Dropdown, Menu } from "antd";
import { BiTrash, BiPencil } from "react-icons/bi";
import { timeAgo } from "../../utils/timeAgo";
import { useSelector } from "react-redux";
import styled from "styled-components";

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
  }
`;

const CardContent = ({ post }) => {
  const {
    contents,
    date,
    writer: { _id },
  } = post;
  const { name: writerName } = post.writer;
  const currentUser = useSelector((state) => state.auth.userId); // useSelector로 내 게시글인지 가져오기
  const isMine = () => _id === currentUser;
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const contentRef = useRef();

  const onToggleComment = useCallback(() => {
    setCommented((prev) => !prev);
  });

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  });

  const menu = (
    <Menu
      style={{
        textAlign: "center",
        borderRadius: "40px",
        overflow: "hidden",
      }}
    >
      <Menu.Item style={{ display: "inline-block" }}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: "0.8rem 0.5rem 0.8rem 1.2rem" }}
        >
          <BiPencil style={{ fontSize: "1.5rem" }} />
        </a>
      </Menu.Item>
      <Menu.Item style={{ display: "inline-block" }}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "tomato", padding: "0.8rem 1.2rem 0.8rem 0.5rem " }}
        >
          <BiTrash style={{ fontSize: "1.5rem" }} />
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <ContentWrapper ref={contentRef}>
      <div className="icon__wrapper">
        {isMine() ? (
          <Dropdown overlay={menu} placement="topCenter" arrow>
            <FiMoreHorizontal
              style={{ marginLeft: "0.5em", cursor: "pointer" }}
            />
          </Dropdown>
        ) : null}

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
          <span className="writer-name">{writerName}</span>
          <span className="pub-date">{timeAgo(date)}</span>
          <div className="text">{contents}</div>
        </div>
      )}
    </ContentWrapper>
  );
};

export default CardContent;
