import React from "react";
import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { follow, unFollow } from "../redux/UserSlice";
import { dynamicSort } from "../utils/dynamicSort";

const DeleteOrAdd = ({ userInfo }) => {
  const isSearchPage = true;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.user);

  const handleAddFollow = () => {
    const payload = {
      followUserEmail: userInfo.email,
      token,
    };
    dispatch(follow(payload));
  };

  const handleRemoveFollow = () => {
    const payload = {
      unfollowUserEmail: userInfo.email,
      token,
    };
    dispatch(unFollow(payload));
  };

  return (
    <IconWrapper>
      {isSearchPage && !userInfo.isFollowing ? (
        <IoIosAddCircle onClick={handleAddFollow} />
      ) : (
        <RiDeleteBack2Line onClick={handleRemoveFollow} />
      )}
    </IconWrapper>
  );
};

const FriendList = () => {
  const user = useSelector((state) => state.user);

  return (
    <FriendListWrapper>
      {user && user.users.length > 0 ? (
        Object.values(user.users)
          .sort(dynamicSort("name"))
          .map((friend, i) => (
            <FriendItem key={i}>
              {friend.profileImageUrl ? (
                <ProfileImg src={friend.profileImageUrl} />
              ) : (
                <FaUserCircle style={{ fontSize: "3rem" }} />
              )}
              <Name>{friend.name}</Name>
              <DeleteOrAdd userInfo={friend} />
            </FriendItem>
          ))
      ) : (
        <div>친구가 없습니다.</div>
      )}
    </FriendListWrapper>
  );
};
export default FriendList;

const IconWrapper = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.3);
    transition: 0.3s;
  }
`;

const FriendListWrapper = styled.ul``;

const FriendItem = styled.li`
  display: flex;
  align-items: center;
  padding: 1em 0;
`;

const ProfileImg = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const Name = styled.span`
  flex: 1;
  padding-left: 2em;
`;
