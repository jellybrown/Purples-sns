import { Modal, Avatar } from "antd";
import React from "react";
import { FaRegKissWinkHeart, FaRegSadCry, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useModal from "../../hooks/useModal";
import { userLoading } from "../../redux/AuthSlice";
import { follow, unFollow } from "../../redux/UserSlice";
import { changeDate } from "../../utils/changeDate";

const FollowModal = ({
  userId,
  userEmail,
  userName,
  userImg,
  writeDate,
  isFollowing,
}) => {
  const [modalState, onOpenModal, onCloseModal] = useModal();
  const currentUser = useSelector((state) => state.auth.userId);
  const { token } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const showModal = () => {
    if (currentUser === userId) return;
    onOpenModal();
  };

  const handleAddFollow = () => {
    const payload = {
      followUserEmail: userEmail,
      token,
    };
    dispatch(follow(payload));
    dispatch(userLoading(token));
    onCloseModal();
  };

  const handleRemoveFollow = () => {
    const payload = {
      unfollowUserEmail: userEmail,
      token,
    };
    dispatch(unFollow(payload));
    dispatch(userLoading(token));
    onCloseModal();
  };

  return (
    <ModalWrapper>
      <Info onClick={showModal}>
        {userImg ? (
          <Avatar src={userImg} size={30} />
        ) : (
          <AvatarIcon>
            <FaUserCircle />
          </AvatarIcon>
        )}
        <PostInfo>
          <Name>{userName}</Name>
          <Date>{changeDate(writeDate)}</Date>
        </PostInfo>
      </Info>
      <CustomModal footer={null} visible={modalState} onCancel={onCloseModal}>
        <StateText>
          {isFollowing ? "이미 팔로우한 유저입니다." : "이 유저를..."}
        </StateText>
        <FollowWrapper>
          <FollowIcon>
            {isFollowing ? <FaRegSadCry /> : <FaRegKissWinkHeart />}
          </FollowIcon>

          {isFollowing ? (
            <FollowButton onClick={() => handleRemoveFollow()}>
              팔로우 취소하기
            </FollowButton>
          ) : (
            <FollowButton onClick={() => handleAddFollow()}>
              팔로우 하기
            </FollowButton>
          )}
        </FollowWrapper>
        <CloseButton onClick={onCloseModal}>닫기</CloseButton>
      </CustomModal>
    </ModalWrapper>
  );
};

export default FollowModal;

const CustomModal = styled(Modal)`
  width: 270px !important;

  p,
  span {
    padding: 0;
    margin: 0;
  }
  .anticon svg {
    display: none;
  }
  .ant-modal-content {
    width: 270px;
    height: 200px;
    text-align: center;
  }
  .ant-modal-content,
  .ant-modal-header {
    border-radius: 20px;
  }
  .ant-modal-body {
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ModalWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;
`;

const Name = styled.span`
  margin-left: 0.8em;
  font-weight: 500;
`;

const Date = styled.span`
  line-height: 22px;
  font-size: 0.7rem;
  margin-left: 1em;
  color: #a3a3a3;
`;

const AvatarIcon = styled.div`
  display: flex;
  align-items: center;

  > svg {
    font-size: 2rem;
    line-height: 30px;
    height: 30px;
  }
`;

const StateText = styled.p`
  color: #a9a9a9;
`;

const FollowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

const FollowIcon = styled.div`
  font-size: 1.3rem;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const FollowButton = styled.button`
  text-decoration: underline;
  font-size: 1rem;
  cursor: pointer;
  background: none;
`;

const CloseButton = styled.button`
  margin-top: 30px;
  background-color: #f4f4f4;
  width: 87%;
  padding: 1em 0;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
`;
