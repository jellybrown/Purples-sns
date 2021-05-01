import { FaUserCircle } from "react-icons/fa";
import { Card } from "antd";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const UserInfo = () => {
  const { name, profileImageUrl } = useSelector((state) => state.auth.user);

  return (
    <div style={{ display: " flex", alignItems: "center", padding: "1em" }}>
      {profileImageUrl ? (
        <ProfileImage src={profileImageUrl} />
      ) : (
        <FaUserCircle style={{ fontSize: "4rem" }} />
      )}
      <div style={{ marginLeft: "20px" }}>
        <span style={{ fontSize: "1rem" }}>{name}</span>
        <p style={{ fontSize: "0.8rem", fontWeight: "300" }}>
          {name}님, 반가워요!
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
