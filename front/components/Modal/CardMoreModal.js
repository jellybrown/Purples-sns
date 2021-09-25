import React from "react";
import ROUTES from "constants/routesPath";
import { Modal } from "antd";
import { useRouter } from "next/router";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { removePost } from "../../redux/PostSlice";
import PropTypes from "prop-types";
import useModal from "../../hooks/useModal";

const MoreModal = ({ isMine, writerName, postId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.user);
  const [modalState, onOpenModal, onCloseModal] = useModal();

  const deletePost = (id) => {
    const body = {
      token,
      id,
    };
    dispatch(removePost(body));
    onCloseModal();
  };

  return (
    <ModalWrapper>
      <More>
        <FiMoreHorizontal onClick={onOpenModal} />
      </More>
      <CustomModal footer={null} visible={modalState} onCancel={onCloseModal}>
        <Text>이 게시물을..</Text>
        <Line />
        {isMine() ? (
          <Delete onClick={() => deletePost(postId)}>삭제</Delete>
        ) : (
          <Info>{writerName}님의 글</Info>
        )}
        <Line />
        <DetailLink onClick={() => router.push(`${ROUTES.POST}/${postId}`)}>
          상세페이지로
        </DetailLink>
        <CloseButton onClick={onCloseModal}>닫기</CloseButton>
      </CustomModal>
    </ModalWrapper>
  );
};

MoreModal.propTypes = {
  isMine: PropTypes.func.isRequired,
  writerName: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};

export default MoreModal;

const ModalWrapper = styled.div`
  display: inline-block;
`;

const More = styled.div`
  > svg {
    margin-left: 0.5em;
    cursor: pointer;
  }
`;

const CustomModal = styled(Modal)`
  width: 270px !important;

  .anticon svg {
    display: none;
  }
  .ant-modal-content {
    width: 270px;
    height: 300px;
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
`;

const Line = styled.hr`
  border: none;
  border-bottom: 1px solid #dfdfdf;
  width: 80%;
  margin: 0 auto;
`;

const Info = styled.span`
  color: #a9a9a9;
  display: block;
  margin: 1.5em 0;
`;

const DetailLink = styled.a`
  margin: 1.5em 0;
  display: block;
  color: #000;
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
