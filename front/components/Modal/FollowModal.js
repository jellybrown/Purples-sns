import { Modal } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import styled from "styled-components";

const ModalWrapper = styled.div`
  display: inline-block;
  .more__icon {
    margin-left: 0.5em;
    cursor: pointer;
  }
`;

// userId,name 전달받기
const FollowModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <ModalWrapper>
      <span>
        <span className="more__icon" onClick={showModal}>
          유123진
        </span>
      </span>
      <Modal
        className="more__modal detail"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <p className="title">이미 팔로우한 유저입니다.</p>
        <span className="delete">팔로우 취소하기</span>
        <button className="more__close" onClick={handleCancel}>
          닫기
        </button>
      </Modal>
    </ModalWrapper>
  );
};

export default FollowModal;
