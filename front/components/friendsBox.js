import FriendList from "./friendList";

const MyFollowersTitle = () => {
  return <p>My Followers</p>;
};

const MyFollowingsTitle = () => {
  return <p>My Followings</p>;
};

const FriendsBox = () => {
  const isMyFollowers = false;
  const isMyFollowings = false;
  return (
    <div
      style={{
        maxWidth: "500px",
        width: "93%",
        borderRadius: "30px",
        border: "1px solid #f0f0f0",
        padding: "2.5em",
        boxShadow: "3px 3px 20px rgba(0,0,0,0.05)",
      }}
    >
      {isMyFollowers ? <MyFollowersTitle /> : null}
      {isMyFollowings ? <MyFollowingsTitle /> : null}
      <FriendList />
    </div>
  );
};

export default FriendsBox;
