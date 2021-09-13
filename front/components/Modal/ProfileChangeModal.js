import React from "react";
import { Modal } from "antd";
import useModal from "../../hooks/useModal";
import styled from "styled-components";
import { useRouter } from "next/router";

const ProfileChangeModal = () => {
  const [modalState, onOpenModal, onCloseModal] = useModal();
  const router = useRouter();

  const onCloseProfile = () => {
    onCloseModal();
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  return (
    <ModalWrapper>
      <SaveButton onClick={onOpenModal} type="submit">
        프로필 저장
      </SaveButton>
      <CustomModal footer={null} visible={modalState}>
        <Text>프로필이 변경되었습니다.</Text>
        <CloseButton onClick={onCloseProfile}>확인</CloseButton>
      </CustomModal>
    </ModalWrapper>
  );
};

export default ProfileChangeModal;

const ModalWrapper = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const CustomModal = styled(Modal)`
  width: 300px !important;

  p,
  span {
    padding: 0;
    margin: 0;
  }
  .anticon svg {
    display: none;
  }
  .ant-modal-content {
    width: 300px;
    height: 180px;
    text-align: center;
  }
  .ant-modal-content,
  .ant-modal-header {
    border-radius: 20px;
  }
  .ant-modal-body {
    height: 180px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const SaveButton = styled.button`
  width: 100%;
  padding: 1em 3.5em;
  margin: 15px 0;
  border: 1px solid #fff;
  border-radius: 30px !important;
  border-color: #cfcfcf;
  font-size: 0.9rem;
  outline: none;
  color: #000;
  margin-top: 100px;
  background: rgba(255, 255, 255, 0.5);
  transition: 0.5s;
  cursor: pointer;

  &:hover {
    background-color: #1c2b4b;
    color: #fff;
  }
`;

const Text = styled.p`
  font-size: 14px;
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
