import { Button, Input, Modal } from "antd";
import { useRef, useState, useEffect, useCallback } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
import { ADD_POST_REQUEST } from "../../redux/types";

const Wrapper = styled.div`
  overflow: hidden;
  max-height: 300px;
`;

const PostForm = () => {
  const dispatch = useDispatch();
  const { _id, name, token } = useSelector((state) => state.auth.user);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const [previewImageUrl, setPreviewImageUrl] = useState([]);
  const [userText, setUserText] = useState("");
  const [userPhoto, setUserPhoto] = useState([]);
  let data = [];

  const fileRef = useRef();
  const formRef = useRef();

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

    dispatch({
      type: ADD_POST_REQUEST,
      payload: body,
    });
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onPhotoUpload = () => {
    fileRef.current.click();
  };

  // 이미지 프리뷰를 위한 함수 (onChangePhoto)
  // 파일정보는 state로 관리함 (userPhoto)
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

    setUserPhoto(fileList);
  };

  // 프리뷰 영역 slick arrow (prev, next)
  const [currentSlide, setCurrentSlide] = useState(0);
  const NextArr = (props) => {
    const { className, style, onClick } = props;
    return (
      <GrNext
        className={className}
        style={{
          ...style,
          display: "block",
          transform: "translateX(-15px) scale(1.3)",
          paddingleftt: "2em",
        }}
        onClick={onClick}
      />
    );
  };
  const PrevArr = (props) => {
    const { className, style, onClick } = props;
    return (
      <GrPrevious
        className={className}
        style={{
          ...style,
          display: "block",
          transform: "translateX(15px) scale(1.3)",
        }}
        onClick={onClick}
      />
    );
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
        <div style={{ position: "relative" }}>
          <Slick
            dots={false}
            initialSlide={0}
            beforeChange={(slide) => setCurrentSlide(slide)}
            slidesToShow={1}
            slidesToScroll={1}
            autoplay={false}
            nextArrow={<NextArr />}
            prevArrow={<PrevArr />}
          >
            {previewImageUrl
              ? previewImageUrl.map((imageUrl) => (
                  <Wrapper>
                    <img
                      style={{ width: "300px", margin: "0 auto" }}
                      src={imageUrl}
                    />
                  </Wrapper>
                ))
              : null}
          </Slick>
        </div>
      </Modal>
    </>
  );
};
export default PostForm;
