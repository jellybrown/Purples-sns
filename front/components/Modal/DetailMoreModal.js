import { Modal } from "antd";
import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import styled from "styled-components";
import useModal from "../../hooks/useModal";

const ModalWrapper = styled.div`
  display: inline-block;
  .more__icon {
    margin-left: 0.5em;
    cursor: pointer;
  }
`;

const DetailMoreModal = () => {
  const [modalState, onOpenModal, onCloseModal] = useModal();

  return (
    <ModalWrapper>
      <span>
        <FiMoreHorizontal className="more__icon" onClick={onOpenModal} />
      </span>
      <Modal
        className="custom__modal detail"
        footer={null}
        visible={modalState}
        onCancel={handleCancel}
      >
        <p className="title">이 게시물을..</p>
        <hr />
        <span className="delete">삭제</span>
        <button className="more__close" onClick={onCloseModal}>
          닫기
        </button>
      </Modal>
    </ModalWrapper>
  );
};

export default DetailMoreModal;
