import { Modal } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FiMoreHorizontal } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { removePost } from "../../redux/PostSlice";
import PropTypes from "prop-types";

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
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deletePost = (id) => {
    const body = {
      token,
      id,
    };
    dispatch(removePost(body));
    handleCancel();
  };

  return (
    <ModalWrapper>
      <span>
        <FiMoreHorizontal className="more__icon" onClick={showModal} />
      </span>
      <Modal
        className="custom__modal"
        footer={null}
        visible={isModalVisible}
        onCancel={handleCancel}
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
        <button className="more__close" onClick={handleCancel}>
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
