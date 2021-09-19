import styled from "styled-components";
import { List } from "antd";

export const CommentsWrapper = styled(List)`
  .ant-list-items {
    min-height: 150px;
  }
  .ant-list-item-meta-title {
    margin-bottom: 0;
  }
  .ant-list-item-meta-avatar {
    height: 32px;
  }
  .ant-list-item-meta {
    align-items: center;
    flex: none;
  }
  .ant-list-item-meta-content {
    width: auto;
  }
  .ant-list-item {
    border-bottom: none !important;
  }
`;

export const CommentItem = styled.div`
  flex: 1;
  display: flex;
`;

export const Content = styled.div`
  color: #303030;
  padding-left: 10px;
  flex: 1;
`;

export const Text = styled.span`
  font-size: 0.9em;
`;

export const Date = styled.span`
  font-size: 0.8em;
  color: #a3a3a3;
  margin-left: 8px;
`;

export const DeleteButton = styled.button`
  font-size: 0.8em;
  margin-left: 0.6em;
  color: #ccc;
  border: none;
  background: none;
`;
