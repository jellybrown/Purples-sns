import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { Card } from "antd";
import {
  UserInfoWrapper,
  UserImg,
  UserName,
  ProfileInfo,
  FollowBox,
  Title,
  Count,
} from "./index.style";

const UserInfo = () => {
  const { name, profileImageUrl } = useSelector((state) => state.auth.user);

  return (
    <UserInfoWrapper>
      {profileImageUrl ? (
        <UserImg src={profileImageUrl} />
      ) : (
        <FaUserCircle style={{ fontSize: "4rem" }} />
      )}
      <UserName>
        <span>{name}</span>
        <p>{name}님, 반가워요!</p>
      </UserName>
    </UserInfoWrapper>
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
      <ProfileInfo>
        <FollowBox>
          <Title>Followers</Title>
          <Count>{authUser && authUser.followerCount}</Count>
        </FollowBox>
        <FollowBox>
          <Title>Followings</Title>
          <Count>{authUser && authUser.followCount}</Count>
        </FollowBox>
      </ProfileInfo>
    </Card>
  );
};

export default MainProfile;
