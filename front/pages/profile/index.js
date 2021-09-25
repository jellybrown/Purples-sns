import React, { useState, useEffect, useRef, useCallback } from "react";
import ROUTES from "constants/routesPath";
import Layout from "styles/layout";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Router from "next/router";
import { getCookie, updateUser, userLoading } from "redux/AuthSlice";
import { wrapper } from "redux/store";
import { FaUserCircle } from "react-icons/fa";
import ProfileChangeModal from "components/Modal/ProfileChangeModal";
import {
  Title,
  ItemWrapper,
  Image,
  ChangeButton,
  Label,
  Email,
  ProfileForm,
  AntNameInput,
} from "./index.style";

const Profile = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    !isAuthenticated && Router.push(ROUTES.LOGIN);
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
        <ItemWrapper>
          <Image size={220} src={loadImage()} onClick={handleSelectImage} />
          <ChangeButton onClick={handleSelectImage}>사진 변경</ChangeButton>
          <input
            style={{ display: "none" }}
            type="file"
            ref={fileRef}
            onChange={onChangeImage}
            accept="image/jpeg, image/png"
          />
        </ItemWrapper>

        <ItemWrapper>
          <Label>아이디</Label>
          <Email>{email}</Email>
        </ItemWrapper>
        <ItemWrapper>
          <Label>이름</Label>
          <AntNameInput
            name="name"
            id="name"
            size="large"
            placeholder={"이름"}
            value={form.name}
            onChange={onChangeForm}
          />
        </ItemWrapper>
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
