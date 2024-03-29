import React, { useCallback, useEffect, useRef, useState } from "react";
import { Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { addPost } from "redux/PostSlice";
import { BsPencil } from "react-icons/bs";
import {
  PostFormWrapper,
  ImageWrapper,
  WriteButton,
  SelectButton,
  FileUpload,
  PreviewText,
  PreviewImages,
  ImageStyle,
} from "./index.style";

const PostForm = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.user);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [previewImageUrl, setPreviewImageUrl] = useState([]);
  const [userText, setUserText] = useState("");
  const [userPhoto, setUserPhoto] = useState([]);

  const fileRef = useRef();
  const formRef = useRef();

  useEffect(() => {
    !isModalVisible &&
      (() => {
        // 입력 후 초기화
        setPreviewImageUrl([]);
        setUserText("");
        setUserPhoto([]);
      })();
  }, [isModalVisible]);

  const onChangeText = (e) => {
    setUserText(e.target.value);
  };

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  // 글 작성시 text,photo 정보를 dispatch하고, 모달을 닫는 함수 (handleOk)
  const handleOk = () => {
    // image 변수화
    if (userPhoto === null || userPhoto.length == 0) {
      message.info("이미지를 하나 이상 등록해주세요.", 1);
      return;
    }
    if (authData) {
      let { _id, name, token } = authData;
      const body = {
        contents: userText,
        images: userPhoto,
        writer: _id,
        userName: name,
        token,
      };
      dispatch(addPost(body));
      setIsModalVisible(false);
    }
  };

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const onPhotoUpload = useCallback(() => {
    fileRef.current.click();
  }, []);

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
    setUserPhoto(fileList);
  };

  const onChangePhoto = (e) => {
    fileList = e.target.files;
    previewAndUpdatePhoto(fileList);
  };

  return (
    <PostFormWrapper>
      <WriteButton onClick={showModal}>
        <BsPencil />
      </WriteButton>
      <Modal
        title="게시글 작성"
        visible={isModalVisible}
        onOk={handleOk}
        okText="게시"
        onCancel={handleCancel}
        cancelText="취소"
        okButtonProps={{
          style: {
            background: "rgb(125 136 202)",
            borderColor: "rgb(125 136 202)",
          },
        }}
      >
        <Input.TextArea
          value={userText}
          onChange={onChangeText}
          style={{ marginBottom: "2rem" }}
        />
        <SelectButton onClick={onPhotoUpload}>사진 선택</SelectButton>
        <input
          style={{ display: "none" }}
          type="file"
          ref={fileRef}
          multiple={true}
          onChange={onChangePhoto}
        />
        {previewImageUrl ? <PreviewText>미리보기</PreviewText> : null}
        <PreviewImages>
          {previewImageUrl
            ? previewImageUrl.map((imageUrl) => (
                <ImageWrapper>
                  <ImageStyle src={imageUrl} />
                </ImageWrapper>
              ))
            : null}
        </PreviewImages>
      </Modal>
    </PostFormWrapper>
  );
};
export default PostForm;
