import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { Card } from "antd";
import styled from "styled-components";

const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1em;

  .main-profile__img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .main-profile__info {
    margin-left: 20px;
    span {
      font-size: 1rem;
    }
    p {
      font-size: 0.8rem;
      font-weight: 300;
    }
  }
`;

const UserInfo = () => {
  const { name, profileImageUrl } = useSelector((state) => state.auth.user);

  return (
    <UserInfoWrapper>
      {profileImageUrl ? (
        <img className="main-profile__img" src={profileImageUrl} />
      ) : (
        <FaUserCircle style={{ fontSize: "4rem" }} />
      )}
      <div className="main-profile__info">
        <span>{name}</span>
        <p>{name}님, 반가워요!</p>
      </div>
    </UserInfoWrapper>
  );
};

const ProfileInfo = styled.div`
  display: flex;
  text-align: center;
  padding: 20px 0;

  .followers,
  .followings {
    flex-basis: 50%;
  }
  .followers__title,
  .followings__title {
    font-family: "Yellowtail";
    font-size: 1.3rem;
    margin: 0;
  }
  .followers__count,
  .followings__count {
    font-family: "Yellowtail";
    font-size: 3rem;
  }
`;

const MainProfile = () => {
  const authUser = useSelector((state) => state.auth.user);

  return (
    <Card
      title={<UserInfo />}
      bordered={true}
      style={{ width: 320, borderRadius: "30px" }}
    >
      <ProfileInfo>
        <div className="followers">
          <p className="followers__title">Followers</p>
          <span className="followers__count">
            {authUser && authUser.followerCount}
          </span>
        </div>
        <div className="followings">
          <p className="followings__title">Followings</p>
          <span className="followings__count">
            {authUser && authUser.followCount}
          </span>
        </div>
      </ProfileInfo>
    </Card>
  );
};

export default MainProfile;
