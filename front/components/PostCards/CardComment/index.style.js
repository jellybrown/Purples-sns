import styled from "styled-components";
import { FaUserCircle } from "react-icons/fa";
import { Card } from "antd";

export const CommentsWrapper = styled.div`
  position: absolute;
  left: 0;
  top: 5px;
  width: 100%;
  min-height: 200px;
  max-height: 800px;

  .ant-card-meta-avatar {
    padding-right: 11px;
  }
`;

export const CommentsCount = styled.p`
  font-size: 0.85rem;
  margin-bottom: 1.3em;
  margin-left: 5px;
  color: #a3a3a3;
`;

export const CommentList = styled.ul`
  height: 110px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const CommentItem = styled.li`
  display: flex;
  align-items: center;
  padding-top: 3px;
  padding-bottom: 0.8em;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
`;

export const CommentText = styled.span`
  margin-left: 1em;
  font-size: 0.75rem;
`;

export const CommentDate = styled.span`
  margin-left: 20px;
  font-size: 0.7rem;
  color: #a3a3a3;
`;

export const UserCircle = styled(FaUserCircle)`
  display: block;
  width: auto;
  height: 24px;
`;

export const CommentMeta = styled(Card.Meta)`
  display: inline-flex;
  align-items: center;
  overflow: visible;
  .ant-card-meta-title {
    font-size: 0.85rem;
  }
`;
