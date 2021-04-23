import { Modal, Avatar } from "antd";
import React, { useState } from "react";
import { FaRegKissWinkHeart, FaRegSadCry } from "react-icons/fa";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ModalWrapper = styled.div`
  display: inline-block;
  cursor: pointer;
  .user__name {
    margin-left: 0.8em;
    font-weight: 500;
  }
`;

const FollowModal = ({ userId, userName, userImg }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const currentUser = useSelector((state) => state.auth.userId);
  const showModal = () => {
    if (currentUser === userId) return;
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const followState = false;

  return (
    <ModalWrapper>
      <div onClick={showModal}>
        <Avatar src={userImg} size={30} />
        <span className="user__name">{userName}</span>
      </div>
      <Modal
        className="custom__modal detail"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <p className="follow__state">
          {followState ? "이미 팔로우한 유저입니다." : "이 유저를..."}
        </p>
        <span className="icon">
          {followState ? <FaRegSadCry /> : <FaRegKissWinkHeart />}
        </span>
        <span className="action__desc">
          {followState ? "팔로우 취소하기" : "팔로우 하기"}
        </span>
        <button className="more__close" onClick={handleCancel}>
          닫기
        </button>
      </Modal>
    </ModalWrapper>
  );
};

export default FollowModal;
