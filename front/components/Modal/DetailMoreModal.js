import { Modal } from "antd";
import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import styled from "styled-components";
import useModal from "../../hooks/useModal";

const DetailMoreModal = () => {
  const [modalState, onOpenModal, onCloseModal] = useModal();

  return (
    <ModalWrapper>
      <More>
        <FiMoreHorizontal onClick={onOpenModal} />
      </More>
      <CustomModal footer={null} visible={modalState} onCancel={onCloseModal}>
        <Text>이 게시물을..</Text>
        <Line />
        <Delete>삭제</Delete>
        <CloseButton onClick={onCloseModal}>닫기</CloseButton>
      </CustomModal>
    </ModalWrapper>
  );
};

export default DetailMoreModal;

const More = styled.div`
  > svg {
    margin-left: 0.5em;
    cursor: pointer;
  }
`;

const ModalWrapper = styled.div`
  display: inline-block;
`;

const CustomModal = styled(Modal)`
  width: 270px !important;

  .anticon svg {
    display: none;
  }
  .ant-modal-content {
    width: 270px;
    height: 250px;
    text-align: center;
  }
  .ant-modal-content,
  .ant-modal-header {
    border-radius: 20px;
  }
`;

const Text = styled.p`
  padding: 1em 0 1.5em 0;
  margin: 0;
`;

const Delete = styled.button`
  color: #a9a9a9;
  cursor: pointer;
  border: none;
  background: none;
  padding: 1.5em 0;
  display: block;
  margin: 0 auto;
`;

const Line = styled.hr`
  border: none;
  border-bottom: 1px solid #dfdfdf;
  width: 80%;
  margin: 0 auto;
`;

const CloseButton = styled.button`
  margin-top: 1em;
  background-color: #f4f4f4;
  width: 87%;
  padding: 1em 0;
  border-radius: 20px;
  outline: none;
  cursor: pointer;
`;
