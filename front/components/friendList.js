import styled from "styled-components";
import { IoIosAddCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { RiDeleteBack2Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { FOLLOW_REQUEST } from "../redux/types";

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

const DeleteOrAdd = ({ userInfo }) => {
  const isSearchPage = true;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.user);

  const handleAddFollow = () => {
    console.log(userInfo);
    dispatch({
      type: FOLLOW_REQUEST,
      payload: {
        followUserEmail: userInfo.email,
        token,
      },
    });
  };
  return (
    <Wrapper>
      {isSearchPage && !userInfo.isFollowing ? (
        <IoIosAddCircle onClick={handleAddFollow} />
      ) : (
        <RiDeleteBack2Line />
      )}
    </Wrapper>
  );
};

const FriendList = () => {
  const user = useSelector((state) => state.user);

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
            <span style={{ flex: "1", paddingLeft: "1em" }}>{friend.name}</span>
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
