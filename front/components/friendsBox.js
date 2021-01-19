import FriendList from "./friendList";
import styled from "styled-components";

const MyFollowersTitle = () => {
  return <p>My Followers</p>;
};

const MyFollowingsTitle = () => {
  return <p>My Followings</p>;
};

const BoxWrapper = styled.div`
  max-width: ${({ isFindPage }) => (isFindPage ? "auto" : "500px")};
  width: ${({ isFindPage }) => (isFindPage ? "95%" : "93%")};
  border-radius: 30px;
  border: 1px solid #f0f0f0;
  padding: 2.5em;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.05);
  background: #fff;
  margin: 2em auto 0;
`;

const FriendsBox = ({ ...props }) => {
  const isMyFollowers = false;
  const isMyFollowings = false;
  return (
    <BoxWrapper {...props}>
      {isMyFollowers ? <MyFollowersTitle /> : null}
      {isMyFollowings ? <MyFollowingsTitle /> : null}

      <FriendList />
    </BoxWrapper>
  );
};

export default FriendsBox;
