import { Modal, Avatar } from "antd";
import React, { useEffect, useState } from "react";
import { FaRegKissWinkHeart, FaRegSadCry, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  decreaseFollowCount,
  increaseFollowCount,
  userLoading,
} from "../../redux/AuthSlice";
import { follow, unFollow } from "../../redux/UserSlice";
import { timeAgo } from "../../utils/timeAgo";

const ModalWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  .user__name {
    margin-left: 0.8em;
    font-weight: 500;
  }
`;

const FollowModal = ({
  userId,
  userEmail,
  userName,
  userImg,
  writeDate,
  isFollowing,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentUser = useSelector((state) => state.auth.userId);
  const { token } = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const showModal = () => {
    if (currentUser === userId) return;
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddFollow = () => {
    const payload = {
      followUserEmail: userEmail,
      token,
    };
    dispatch(follow(payload));
    dispatch(userLoading(token));
    handleCancel();
  };

  const handleRemoveFollow = () => {
    const payload = {
      unfollowUserEmail: userEmail,
      token,
    };
    dispatch(unFollow(payload));
    dispatch(userLoading(token));
    handleCancel();
  };

  return (
    <ModalWrapper>
      <div
        onClick={showModal}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {userImg ? (
          <Avatar src={userImg} size={30} />
        ) : (
          <FaUserCircle
            style={{
              fontSize: "2rem",
              lineHeight: "30px",
              height: "30px",
            }}
          />
        )}
        <span className="user__name">{userName}</span>
        <span className="pub-date">{timeAgo(writeDate)}</span>
      </div>
      <Modal
        className="custom__modal follow"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <p className="follow__state">
          {isFollowing ? "이미 팔로우한 유저입니다." : "이 유저를..."}
        </p>
        <div className="action__desc">
          <span className="icon">
            {isFollowing ? <FaRegSadCry /> : <FaRegKissWinkHeart />}
          </span>

          {isFollowing ? (
            <span className="action__text" onClick={() => handleRemoveFollow()}>
              팔로우 취소하기
            </span>
          ) : (
            <span className="action__text" onClick={() => handleAddFollow()}>
              팔로우 하기
            </span>
          )}
        </div>
        <button className="more__close" onClick={handleCancel}>
          닫기
        </button>
      </Modal>
    </ModalWrapper>
  );
};

export default FollowModal;
