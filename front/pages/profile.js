import React, { useState, useEffect, useRef, useCallback } from "react";
import Layout from "../styles/layout";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Router from "next/router";
import { Input as AntInput, Avatar } from "antd";
import { getCookie, updateUser, userLoading } from "../redux/AuthSlice";
import { wrapper } from "../redux/store";
import { FaUserCircle } from "react-icons/fa";
import ProfileChangeModal from "../components/Modal/ProfileChangeModal";

const Title = styled.h1`
  text-align: center;
  font-family: Yellowtail;
  font-size: 2rem;
  padding: 2.5rem 0 1rem;
`;
const ProfileForm = styled.form`
  padding-top: 2em;
  margin: 0 auto;
  width: 40%;
  min-width: 300px;
  max-width: 400px;

  .item__wrapper {
    position: relative;
    padding: 7px 0;
    margin: 7px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .profile__image {
    margin: 0;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }
  .change__letter {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }
  .title__lable {
    min-width: 100px;
    flex: 1 1 auto;
    font-size: 1.3em;
  }
  .user__email {
    font-size: 1.1em;
    padding: 0 10px;
    width: 100%;
  }
`;

const Profile = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    !isAuthenticated && Router.push("/login");
  }, []);

  const { _id, name, token, profileImageUrl, email } =
    isAuthenticated && useSelector((state) => state.auth.user);

  const { save, handleSubmit, watch, errors } = useForm();
  const [previewProfileImage, setProfilePreviewImage] = useState();
  const fileRef = useRef();
  const [form, setForm] = useState({
    profileImage: "",
    name: "",
  });

  const onChangeImage = (e) => {
    let fileList = e.target.files;
    let reader = new FileReader();
    reader.readAsDataURL(fileList[0]);
    reader.onloadend = (e) => {
      setProfilePreviewImage(e.target.result);
    };
    setForm({
      ...form,
      profileImage: e.target.files[0],
    });
  };

  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectImage = useCallback(() => {
    fileRef.current.click();
  }, []);

  useEffect(() => {
    setProfilePreviewImage(profileImageUrl);
    setForm({
      ...form,
      name,
    });
  }, []);

  const onSubmit = () => {
    const body = {
      profileImage: form.profileImage,
      prevUserName: name,
      userName: form.name,
      userId: _id,
      token,
    };
    dispatch(updateUser(body));
  };

  const loadImage = () => {
    if (profileImageUrl && !previewProfileImage) return profileImageUrl;
    else if (previewProfileImage) return previewProfileImage;
    else
      return (
        <FaUserCircle style={{ fontSize: "220px", color: "rgba(0,0,0,0.8)" }} />
      );
  };

  return (
    <Layout>
      <Title>My Profile</Title>
      <ProfileForm onSubmit={handleSubmit(onSubmit)}>
        <div className="item__wrapper">
          <Avatar
            className="profile__image"
            size={220}
            src={loadImage()}
            onClick={handleSelectImage}
          />
          <span className="change__letter" onClick={handleSelectImage}>
            사진 변경
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            ref={fileRef}
            onChange={onChangeImage}
            accept="image/jpeg, image/png"
          />
        </div>
        <div
          style={{
            display: "flex",
            margin: "0 0 80px",
          }}
        ></div>
        <div className="item__wrapper">
          <label className="title__lable">아이디</label>
          <label className="user__email">{email}</label>
        </div>
        <div className="item__wrapper">
          <label className="title__lable">이름</label>
          <AntInput
            name="name"
            id="name"
            size="large"
            style={{ width: "100%", height: "50px", fontSize: "1.1em" }}
            placeholder={"이름"}
            value={form.name}
            onChange={onChangeForm}
          />
        </div>
        <ProfileChangeModal />
      </ProfileForm>
    </Layout>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const token = getCookie("token", context.req);
    if (token !== undefined && token !== null) {
      await context.store.dispatch(userLoading(token));
    }

    return {
      props: context.store.getState().auth,
    };
  }
);
export default Profile;
