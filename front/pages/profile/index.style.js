import styled from "styled-components";
import { Avatar, Input } from "antd";

export const Title = styled.h1`
  text-align: center;
  font-family: Yellowtail;
  font-size: 2rem;
  padding: 2.5rem 0 1rem;
`;

export const ItemWrapper = styled.div`
  position: relative;
  padding: 7px 0;
  margin: 7px 0;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:first-child {
    margin-bottom: 90px;
  }
`;

export const Image = styled(Avatar)`
  margin: 0;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

export const ChangeButton = styled.button`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
`;

export const Label = styled.label`
  min-width: 100px;
  flex: 1 1 auto;
  font-size: 1.2em;
`;

export const Email = styled.label`
  font-size: 1.1em;
  padding: 0 10px;
  width: 100%;
`;

export const ProfileForm = styled.form`
  padding-top: 2em;
  margin: 0 auto;
  width: 40%;
  min-width: 300px;
  max-width: 400px;
`;

export const AntNameInput = styled(Input)`
  width: 100%;
  height: 50px;
`;
