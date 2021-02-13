import { FiHeart, FiMoreHorizontal } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { RiChat2Line, RiChat2Fill } from "react-icons/ri";
import CardComment from "./CardComment";
import { useCallback, useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import { BiTrash, BiPencil } from "react-icons/bi";

const CardContent = () => {
  const isMine = true; // useSelector로 내 게시글인지 가져오기
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);

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
    <div
      style={{
        position: "relative",
        minHeight: "180px",
        height: "20%",
        maxHeight: "500px",
      }}
    >
      <div
        style={{
          zIndex: "2",
          position: "absolute",
          right: 0,
          fontSize: "1.4rem",
        }}
      >
        {isMine ? (
          <Dropdown overlay={menu} placement="topCenter" arrow>
            <FiMoreHorizontal
              style={{ marginLeft: "0.5em", cursor: "pointer" }}
            />
          </Dropdown>
        ) : null}

        <span style={{ marginLeft: "0.5em", cursor: "pointer" }}>
          {commented ? (
            <RiChat2Fill onClick={onToggleComment} />
          ) : (
            <RiChat2Line onClick={onToggleComment} />
          )}
        </span>
        <span style={{ marginLeft: "0.5em", cursor: "pointer" }}>
          {liked ? (
            <FaHeart onClick={onToggleLike} />
          ) : (
            <FiHeart onClick={onToggleLike} />
          )}
        </span>
      </div>
      {commented ? (
        <CardComment />
      ) : (
        <div>
          <span
            style={{ fontSize: "0.9rem", marginLeft: "1em", fontWeight: "500" }}
          >
            유진2
          </span>
          <span
            style={{ fontSize: "0.7rem", marginLeft: "1em", color: "#A3A3A3" }}
          >
            7 hours ago..
          </span>
          <div
            style={{
              fontSize: "0.9rem",
              paddingTop: "1.3em",
              paddingLeft: "1em",
            }}
          >
            케이크 먹을래?
          </div>
        </div>
      )}
    </div>
  );
};

export default CardContent;
