import { Button, Input, Modal } from "antd";
import { useRef, useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";

const PostForm = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [userFile, setUserFile] = useState({});
  const [previewImageUrl, setPreviewImageUrl] = useState([]);
  let data = [];

  useEffect(() => {}, [previewImageUrl]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const fileRef = useRef();
  const previewRef = useRef();
  const onPhotoUpload = () => {
    fileRef.current.click();
  };

  const onChangePhoto = (e) => {
    let fileList = e.target.files;

    for (let i = 0; i < fileList.length; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(fileList[i]);
      reader.onload = (e) => {
        data.push(e.target.result);
      };
      reader.onloadend = () => {
        setPreviewImageUrl(Object.assign([], data));
      };
    }
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
        okText="게시"
        onCancel={handleCancel}
        cancelText="취소"
      >
        <Input.TextArea style={{ marginBottom: "2rem" }} />
        <Button onClick={onPhotoUpload}>사진 선택</Button>
        <input
          style={{ display: "none" }}
          type="file"
          ref={fileRef}
          multiple={true}
          onChange={onChangePhoto}
        />
        {previewImageUrl
          ? previewImageUrl.map((imageUrl) => {
              return (
                <img
                  style={{ width: "300px", height: "300px" }}
                  src={imageUrl}
                />
              );
            })
          : null}
      </Modal>
    </>
  );
};
export default PostForm;
