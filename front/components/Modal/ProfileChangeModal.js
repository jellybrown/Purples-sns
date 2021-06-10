import React from "react";
import { Modal } from "antd";
import useModal from "../../hooks/useModal";
import Input from "../../styles/input";
import styled from "styled-components";
import { useRouter } from "next/router";

const ModalWrapper = styled.div`
  display: inline-block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  p {
    font-size: 16px;
  }
  .save-button {
    color: #000;
    margin-top: 100px;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 50;
    border-color: #cfcfcf;
    transition: 0.5s;
    &:hover {
      background: #152f4e;
      color: #fff;
    }
  }
`;

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
      <Input
        onClick={onOpenModal}
        className="save-button"
        isBtn
        value="저장"
        type="submit"
      />
      <Modal
        className="custom__modal follow"
        footer={null}
        visible={modalState}
      >
        <p>프로필이 변경되었습니다.</p>
        <button className="more__close" onClick={onCloseProfile}>
          확인
        </button>
      </Modal>
    </ModalWrapper>
  );
};

export default ProfileChangeModal;
