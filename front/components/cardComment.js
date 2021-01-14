const CardComment = () => {
  return (
    <div
      style={{
        display: "none",
        position: "absolute",
        left: 0,
        top: "5px",
        width: "100%",
        height: "100%",
      }}
    >
      <p style={{ fontWeight: "500", marginLeft: "5px", color: "#A3A3A3" }}>
        3개의 댓글
      </p>
      <ul>
        <li style={{ marginBottom: "5px" }}>
          <span
            style={{
              fontWeight: "500",
              marginRight: "10px",
            }}
          >
            hehe
          </span>
          <span style={{ fontWeight: "300" }}>어디 케이크야???</span>
        </li>
        <li style={{ marginBottom: "5px" }}>
          <span style={{ fontWeight: "500", marginRight: "10px" }}>user</span>
          <span style={{ fontWeight: "300" }}>우리집 케이크^-^</span>
        </li>
        <li style={{ marginBottom: "5px" }}>
          <span style={{ fontWeight: "500", marginRight: "10px" }}>헤헷</span>
          <span style={{ fontWeight: "300" }}>오~</span>
        </li>
      </ul>
      <input
        placeholder="댓글 입력..."
        style={{
          position: "absolute",
          bottom: "20px",
          paddingTop: "10px",
          marginLeft: "15px",
          border: "none",
          outline: "none",
          width: "90%",
        }}
      />
    </div>
  );
};

export default CardComment;
