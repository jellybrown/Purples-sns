import { Modal } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { removePost } from "../../redux/PostSlice";
import PropTypes from "prop-types";
import useModal from "../../hooks/useModal";

const ModalWrapper = styled.div`
  display: inline-block;
  .more__icon {
    margin-left: 0.5em;
    cursor: pointer;
  }
`;

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
      <span>
        <FiMoreHorizontal className="more__icon" onClick={onOpenModal} />
      </span>
      <Modal
        className="custom__modal"
        footer={null}
        visible={modalState}
        onCancel={onCloseModal}
      >
        <p className="title">이 게시물을..</p>
        <hr />

        {isMine() ? (
          <span className="delete" onClick={() => deletePost(postId)}>
            삭제
          </span>
        ) : (
          <span className="info">{writerName}님의 글</span>
        )}
        <hr />
        <span
          className="go-detail"
          onClick={() => router.push(`/post/${postId}`)}
        >
          상세페이지로
        </span>
        <button className="more__close" onClick={onCloseModal}>
          닫기
        </button>
      </Modal>
    </ModalWrapper>
  );
};

MoreModal.propTypes = {
  isMine: PropTypes.func.isRequired,
  writerName: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
};

export default MoreModal;
