import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Modal } from "antd";
import { AiOutlinePlus } from "react-icons/ai";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { addPost } from "../../redux/PostSlice";

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border: 1px dashed #000000;
  border-radius: 20px;
  margin: 0 10px;
  padding: 0;
`;

const ImageStyle = styled.img`
  padding: 0;
  width: 110px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PostForm = () => {
  const dispatch = useDispatch();
  const { _id, name, token } = useSelector((state) => state.auth.user);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [previewImageUrl, setPreviewImageUrl] = useState([]);
  const [userText, setUserText] = useState("");
  const [userPhoto, setUserPhoto] = useState([]);

  const fileRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    !isModalVisible && (() => {
      // 입력 후 초기화
      setPreviewImageUrl([]);
      setUserText("");
      setUserPhoto([]);
    })();
  }, [isModalVisible])

  const onChangeText = (e) => {
    setUserText(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const imageUploader = (photo) => {
    const formData = new FormData();
    formData.append("file", photo);
    return formData;
  };

  // 글 작성시 text,photo 정보를 dispatch하고, 모달을 닫는 함수 (handleOk)
  const handleOk = () => {
    // image 변수화
    if (userPhoto === null || userPhoto.length == 0) {
      message.info("이미지를 하나 이상 등록해주세요.", 1);
      return;
    }
    console.log("postForm.handleOk() photo => ", userPhoto);

    const body = {
      contents: userText,
      images: userPhoto,
      writer: _id,
      userName: name,
      token,
    };
    console.log("postForm.handleOk() body => ", body);

    dispatch(addPost(body));

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onPhotoUpload = () => {
    fileRef.current.click();
  };

  // data: 프리뷰할때 미리보기 될 사진 배열
  // fileList: 실제로 서버에 올라가는 사진 배열
  let data = [];
  let fileList;
  // 이미지 프리뷰를 위한 함수 (onChangePhoto)
  // 파일정보는 state로 관리함 (userPhoto)

  const previewAndUpdatePhoto = (fileList) => {
    // fileList = e.target.files;

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
    console.log(data);
    setUserPhoto(fileList);
  };

  const onChangePhoto = (e) => {
    fileList = e.target.files;
    previewAndUpdatePhoto(fileList);
  };

  return (
    <div style={{ borderRadius: "25px", overflow: "hidden" }}>
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
        <Input.TextArea
          value={userText}
          onChange={onChangeText}
          style={{ marginBottom: "2rem" }}
        />
        <Button
          onClick={onPhotoUpload}
          style={{ display: "block", marginBottom: "20px" }}
        >
          사진 선택
        </Button>
        <input
          style={{ display: "none" }}
          type="file"
          ref={fileRef}
          multiple={true}
          onChange={onChangePhoto}
        />
        {previewImageUrl ? (
          <p style={{ textAlign: "right" }}>미리보기</p>
        ) : null}
        <div style={{ position: "relative", padding: "20px 0" }}>
          {previewImageUrl
            ? previewImageUrl.map((imageUrl) => (
                <Wrapper>
                  <ImageStyle src={imageUrl} />
                </Wrapper>
              ))
            : null}
        </div>
      </Modal>
    </div>
  );
};
export default PostForm;
