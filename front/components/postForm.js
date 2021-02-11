import { Button, Modal } from "antd";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const PostForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button
        onClick={showModal}
        style={{
          maxWidth: "500px",
          width: "93%",
          cursor: "pointer",
          marginBottom: "25px",
          display: "flex",
          alignItems: "center",
          padding: "20px",
          color: "#333",
          borderRadius: "20px",
          opacity: "0.7",
          fontSize: "0.8rem",
        }}
      >
        <AiOutlinePlus style={{ fontSize: "1.2rem", marginRight: "0.7em" }} />
        게시글 작성...
      </Button>
      <Modal
        title="게시글 작성"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default PostForm;
