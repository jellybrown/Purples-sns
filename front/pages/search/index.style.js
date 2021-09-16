import styled from "styled-components";
import { Card } from "antd";

export const SearchLayout = styled.div`
  display: flex;
  justify-content: center;

  > div {
    width: 95%;
  }
`;

export const SearchLists = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;
`;

export const CardImage = styled(Card)`
  position: relative;
  overflow: hidden;
  height: 300px;
  border: 1px solid #cfcfcf;
  cursor: pointer;

  img {
    object-fit: cover;
    width: 100%;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
`;
