import { useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Card } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ProfileImage = styled.div`
  width: 60px; // 이미지 동그랗게 or antd Avatar 해도될듯
  height: 60px;
`;

const UserInfo = () => {
  const authUser = useSelector((state) => state.auth.user);
  const user = {
    profileImage: false,
  };

  return (
    <div style={{ display: " flex", alignItems: "center", padding: "1em" }}>
      {user.profileImage ? (
        <ProfileImage />
      ) : (
        <FaUserCircle style={{ fontSize: "4rem" }} />
      )}
      <div style={{ marginLeft: "20px" }}>
        <span style={{ fontSize: "1rem" }}>{authUser && authUser.name}</span>
        <p style={{ fontSize: "0.8rem", fontWeight: "300" }}>
          {authUser && authUser.name}님, 반가워요!
        </p>
      </div>
    </div>
  );
};

const MainProfile = () => {
  const authUser = useSelector((state) => state.auth.user);

  return (
    <Card
      title={<UserInfo />}
      bordered={true}
      style={{ width: 320, borderRadius: "30px" }}
    >
      <div
        style={{
          display: "flex",
          textAlign: "center",
          padding: "20px 0",
        }}
      >
        <div style={{ flexBasis: "50%" }}>
          <p
            style={{ fontFamily: "Yellowtail", fontSize: "1.3rem", margin: 0 }}
          >
            Followers
          </p>
          <span style={{ fontFamily: "Yellowtail", fontSize: "3rem" }}>
            {authUser && authUser.followerCount}
          </span>
        </div>
        <div style={{ flexBasis: "50%" }}>
          <p
            style={{ fontFamily: "Yellowtail", fontSize: "1.3rem", margin: 0 }}
          >
            Followings
          </p>
          <span style={{ fontFamily: "Yellowtail", fontSize: "3rem" }}>
            {authUser && authUser.followCount}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default MainProfile;
