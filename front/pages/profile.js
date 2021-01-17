import Layout from "../components/layout";
import Input from "../styles/input";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, message } from "antd";
import styled from "styled-components";
import Router from "next/router";
import { Input as AntInput, Avatar } from "antd";
import { SettingFilled } from "@ant-design/icons";

const InputWrapper = styled.div`
  position: relative;
  padding: 7px 0;
  margin: 7px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Nickname = styled.label`
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

const Profile = ({ isAuthenticated, user }) => {
  const dispatch = useDispatch();
  const { save, handleSubmit, watch, errors } = useForm();

  const onSubmit = (data) => {
    const { email, nickname, password } = data;
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
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
          <Button
            color="black"
            shape="circle"
            size="large"
            icon={<SettingFilled style={{ fontSize: "23px" }} />}
            style={{
              marginTop: "180px",
            }}
          />
        </InputWrapper>
        <div
          style={{
            display: "flex",
            margin: "0 0 80px",
          }}
        >
          <Nickname style={{ margin: "0 auto" }}>{user.nickname}</Nickname>
        </div>
        <InputWrapper>
          <InputLabel>아이디</InputLabel>
          <BasicLabel>{user.email}</BasicLabel>
        </InputWrapper>
        <InputWrapper>
          <InputLabel>이름</InputLabel>
          <AntInput
            size="large"
            style={{ width: "100%", height: "50px", fontSize: "1.3em" }}
            placeholder={"이름"}
            value={user.nickname}
          />
        </InputWrapper>
        <InputWrapper>
          <InputLabel>닉네임</InputLabel>
          <AntInput
            size="large"
            style={{ width: "100%", height: "50px", fontSize: "1.3em" }}
            placeholder={"닉네임"}
            value={user.nickname}
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
