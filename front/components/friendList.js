import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";
import { useSelector } from "react-redux";

const ProfileImage = styled.img`
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
  const user = useSelector((state) => state.user);

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
      {user && user.users.length > 0 ? (
        user.users.map((friend) => (
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
            <span style={{ flex: "1", paddingLeft: "1em" }}>
              {friend.nickname}
            </span>
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
