import { FiHeart, FiMoreHorizontal } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { RiChat2Line, RiChat2Fill } from "react-icons/ri";
import CardComment from "./CardComment";
import { useCallback, useRef, useState } from "react";
import { Button, Dropdown, Menu } from "antd";
import { BiTrash, BiPencil } from "react-icons/bi";

function time_ago(time) {
  switch (typeof time) {
    case "number":
      break;
    case "string":
      time = +new Date(time);
      break;
    case "object":
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, "seconds", 1], // 60
    [120, "1 minute ago", "1 minute from now"], // 60*2
    [3600, "minutes", 60], // 60*60, 60
    [7200, "1 hour ago", "1 hour from now"], // 60*60*2
    [86400, "hours", 3600], // 60*60*24, 60*60
    [172800, "Yesterday", "Tomorrow"], // 60*60*24*2
    [604800, "days", 86400], // 60*60*24*7, 60*60*24
    [1209600, "Last week", "Next week"], // 60*60*24*7*4*2
    [2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, "Last month", "Next month"], // 60*60*24*7*4*2
    [29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, "Last year", "Next year"], // 60*60*24*7*4*12*2
    [2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
    [5806080000, "Last century", "Next century"], // 60*60*24*7*4*12*100*2
    [58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
  ];
  var seconds = (+new Date() - time) / 1000,
    token = "ago",
    list_choice = 1;

  if (seconds == 0) {
    return "Just now";
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "from now";
    list_choice = 2;
  }
  var i = 0,
    format;
  while ((format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == "string") return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + " " + format[1] + " " + token;
    }
  return time;
}

const CardContent = ({ contents, writer, date }) => {
  const isMine = true; // useSelector로 내 게시글인지 가져오기
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const contentRef = useRef();

  const onToggleComment = useCallback(() => {
    setCommented((prev) => !prev);
    // if (commented === true) {
    //   contentRef.current.style.transformOrigin = "top center";
    //   contentRef.current.style.transform = "scaleY(1.5)";
    //   contentRef.current.style.transition = "0.5s";
    // } else {
    //   contentRef.current.style.transformOrigin = "top center";
    //   contentRef.current.style.transform = "scaleY(1)";
    //   contentRef.current.style.transition = "0.5s";
    // }
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
      ref={contentRef}
      style={{
        position: "relative",
        minHeight: "200px",
        height: "50%",
        maxHeight: "800px",
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
            {writer}
          </span>
          <span
            style={{ fontSize: "0.7rem", marginLeft: "1em", color: "#A3A3A3" }}
          >
            {time_ago(date)}
          </span>
          <div
            style={{
              fontSize: "0.9rem",
              paddingTop: "1.3em",
              paddingLeft: "1em",
            }}
          >
            {contents}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardContent;
