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

const DetailMoreModal = () => {
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
        <FiMoreHorizontal className="more__icon" onClick={showModal} />
      </span>
      <Modal
        className="more__modal detail"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <p className="title">이 게시물을..</p>
        <hr />
        <span className="delete">삭제</span>
        <button className="more__close" onClick={handleCancel}>
          닫기
        </button>
      </Modal>
    </ModalWrapper>
  );
};

export default DetailMoreModal;
