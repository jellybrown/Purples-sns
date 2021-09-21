import styled from "styled-components";
import { Button } from "antd";

export const PostFormWrapper = styled.div``;

export const ImageWrapper = styled.div`
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

export const WriteButton = styled(Button)`
  &&& {
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

  > svg {
    font-size: 2rem;
    color: #fff;
  }
`;

export const SelectButton = styled(Button)`
  &&& {
    display: block;
    margin-bottom: 20px;
  }
`;

export const FileUpload = styled.input`
  display: none;
`;

export const PreviewText = styled.p`
  text-align: right;
`;

export const PreviewImages = styled.div`
  position: relative;
  padding: 20px 0;
`;

export const ImageStyle = styled.img`
  padding: 0;
  width: 110px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
