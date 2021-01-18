import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";

const ProfileImage = styled.div`
  width: 60px; // 이미지 동그랗게 or antd Avatar 해도될듯
  height: 60px;
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

const DeleteOrAdd = () => {
  const isSearchPage = true;
  return (
    <Wrapper>
      {isSearchPage ? <IoIosAddCircle /> : <RiDeleteBack2Line />}
    </Wrapper>
  );
};

const FriendList = () => {
  const friends = [
    {
      id: 1,
      name: "배고파",
      profileImage: false,
    },
    {
      id: 2,
      name: "bbb",
      profileImage: false,
    },
    {
      id: 3,
      name: "aaa",
      profileImage: false,
    },
  ];

  return (
    <ul>
      {friends.map((friend) => console.log(friend))}
      {friends && friends.length > 0 ? (
        friends.map((friend) => (
          <li
            style={{
              display: "flex",
              alignItems: "center",
              padding: "1em 0",
            }}
          >
            {friend.profileImage ? (
              <ProfileImage />
            ) : (
              <FaUserCircle style={{ fontSize: "3rem" }} />
            )}
            <span style={{ flex: "1", paddingLeft: "1em" }}>{friend.name}</span>
            <DeleteOrAdd />
          </li>
        ))
      ) : (
        <div>친구가 없습니다.</div>
      )}
    </ul>
  );
};
export default FriendList;
