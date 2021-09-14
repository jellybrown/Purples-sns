import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { Card } from "antd";
import styled from "styled-components";

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

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;
`;

const UserImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const UserName = styled.div`
  margin-left: 20px;
  span {
    font-size: 1rem;
  }
  p {
    font-size: 0.8rem;
    font-weight: 300;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  text-align: center;
  padding: 20px 0;
`;

const FollowBox = styled.div`
  flex-basis: 50%;
`;

const Title = styled.p`
  font-family: "Yellowtail";
  font-size: 1.3rem;
  margin: 0;
`;

const Count = styled.span`
  font-family: "Yellowtail";
  font-size: 3rem;
`;
