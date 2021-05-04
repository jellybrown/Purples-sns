import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Input, Modal } from "antd";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { addPost } from "../../redux/PostSlice";
import { BsPencil } from "react-icons/bs";

const PostFormWrapper = styled.div`
  .write-btn {
    width: 3.8rem;
    height: 3.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    position: fixed;
    right: 25px;
    bottom: 25px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);
    background: #aab2e3;
    border: none;
    z-index: 5;
  }
`;

const Wrapper = styled.div`
  display: inline-block;
  position: relative;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border: 1px solid #e1e1e1;
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
      <Button className="write-btn" onClick={showModal}>
        <BsPencil style={{ fontSize: "2rem", color: "#fff" }} />
      </Button>
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
    </PostFormWrapper>
  );
};
export default PostForm;
