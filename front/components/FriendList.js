import React from "react";
import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { follow, unFollow } from "../redux/UserSlice";

const dynamicSort = (property) => {
  let sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    let result =
      a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

const ProfileImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

const Wrapper = styled.span`
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
    console.log(userInfo);
    const payload = {
      followUserEmail: userInfo.email,
      token,
    };
    dispatch(follow(payload));
  };

  const handleRemoveFollow = () => {
    console.log(userInfo);
    const payload = {
      unfollowUserEmail: userInfo.email,
      token,
    };
    dispatch(unFollow(payload));
  };

  return (
    <Wrapper>
      {isSearchPage && !userInfo.isFollowing ? (
        <IoIosAddCircle onClick={handleAddFollow} />
      ) : (
        <RiDeleteBack2Line onClick={handleRemoveFollow} />
      )}
    </Wrapper>
  );
};

const FriendList = () => {
  const user = useSelector((state) => state.user);

  return (
    <ul>
      {user && user.users.length > 0 ? (
        Object.values(user.users)
          .sort(dynamicSort("name"))
          .map((friend) => (
            <li
              style={{
                display: "flex",
                alignItems: "center",
                padding: "1em 0",
              }}
            >
              {friend.profileImageUrl ? (
                <ProfileImage src={friend.profileImageUrl} />
              ) : (
                <FaUserCircle style={{ fontSize: "3rem" }} />
              )}
              <span style={{ flex: "1", paddingLeft: "2em" }}>
                {friend.name}
              </span>
              <DeleteOrAdd userInfo={friend} />
            </li>
          ))
      ) : (
        <div>친구가 없습니다.</div>
      )}
    </ul>
  );
};
export default FriendList;
