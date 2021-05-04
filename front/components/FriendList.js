import React from "react";
import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { follow, unFollow } from "../redux/UserSlice";
import { dynamicSort } from "../utils/dynamicSort";

const IconWrapper = styled.span`
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    transform: scale(1.3);
    transition: 0.3s;
  }
`;

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

const FriendListWrapper = styled.ul`
  .friend-item {
    display: flex;
    align-items: center;
    padding: 1em 0;
  }
  .profile__image {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
  .user__name {
    flex: 1;
    padding-left: 2em;
  }
`;

const FriendList = () => {
  const user = useSelector((state) => state.user);

  return (
    <FriendListWrapper>
      {user && user.users.length > 0 ? (
        Object.values(user.users)
          .sort(dynamicSort("name"))
          .map((friend) => (
            <li className="friend-item">
              {friend.profileImageUrl ? (
                <img className="profile__image" src={friend.profileImageUrl} />
              ) : (
                <FaUserCircle style={{ fontSize: "3rem" }} />
              )}
              <span className="user__name">{friend.name}</span>
              <DeleteOrAdd userInfo={friend} />
            </li>
          ))
      ) : (
        <div>친구가 없습니다.</div>
      )}
    </FriendListWrapper>
  );
};
export default FriendList;
