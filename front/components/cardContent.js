import { FiHeart, FiMoreHorizontal } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { RiChat2Line, RiChat2Fill } from "react-icons/ri";
import CardComment from "./CardComment";
import { useCallback, useState } from "react";

const CardContent = () => {
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);

  const onToggleComment = useCallback(() => {
    setCommented((prev) => !prev);
  });

  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  });

  return (
    <div
      style={{
        position: "relative",
        minHeight: "168px",
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
        <FiMoreHorizontal style={{ marginLeft: "0.5em", cursor: "pointer" }} />
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
            style={{ fontSize: "0.9rem", marginLeft: "5px", fontWeight: "500" }}
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
              fontSize: "0.8rem",
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
