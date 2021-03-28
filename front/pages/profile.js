import React, { useState, useEffect, useRef } from "react";
import Layout from "../styles/layout";
import Input from "../styles/input";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Upload, Button, message } from "antd";
import styled from "styled-components";
import Router from "next/router";
import { Input as AntInput, Avatar } from "antd";
import { SettingFilled } from "@ant-design/icons";
import { updateUser } from "../redux/AuthSlice"

const InputWrapper = styled.div`
  position: relative;
  padding: 7px 0;
  margin: 7px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.label`
  display: inline-block;
  font-size: 1.3em;
  font-weight: bold;
`;

const BasicLabel = styled.label`
  font-size: 1.3em;
  padding: 0 10px;
  width: 100%;
`;

const InputLabel = styled.label`
  min-width: 100px;
  flex: 1 1 auto;
  font-size: 1.5em;
`;

const Profile = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { _id, name, token, profileImageUrl, email } = useSelector(
    (state) => state.auth.user
  );
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

  const handleSelectImage = () => {
    fileRef.current.click();
  };

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
    console.log(body);

    dispatch(updateUser(body));
    message.info("수정 입력", 1);
  };

  return isAuthenticated ? (
    <Layout>
      <form
        style={{
          paddingTop: "4em",
          margin: "0 auto",
          width: "40%",
          minWidth: "300px",
          maxWidth: "400px",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputWrapper>
          <Avatar
            size={320}
            style={{
              margin: "0",
              left: "50%",
              transform: "translateX(-50%)",
            }}
            src={previewProfileImage}
          />
          <Button
            color="black"
            shape="circle"
            size="large"
            icon={<SettingFilled style={{ fontSize: "23px" }} />}
            style={{
              marginTop: "180px",
            }}
            onClick={handleSelectImage}
          />
          <input
            style={{ display: "none" }}
            type="file"
            ref={fileRef}
            onChange={onChangeImage}
            accept="image/jpeg, image/png"
          />
        </InputWrapper>
        <div
          style={{
            display: "flex",
            margin: "0 0 80px",
          }}
        >
          <Name style={{ margin: "0 auto" }}>{name}</Name>
        </div>
        <InputWrapper>
          <InputLabel>아이디</InputLabel>
          <BasicLabel>{email}</BasicLabel>
        </InputWrapper>
        <InputWrapper>
          <InputLabel>이름</InputLabel>
          <AntInput
            name="name"
            id="name"
            size="large"
            style={{ width: "100%", height: "50px", fontSize: "1.3em" }}
            placeholder={"이름"}
            value={form.name}
            onChange={onChangeForm}
          />
        </InputWrapper>
        <Input
          isBtn
          value="저장"
          type="submit"
          style={{
            marginTop: "100px",
            background: "#152F4E",
            borderRadius: 50,
            borderColor: "#152F4E",
          }}
        />
      </form>
    </Layout>
  ) : (
    (() => Router.push("/"))()
  );
};

export default Profile;
