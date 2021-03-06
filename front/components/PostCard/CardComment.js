import React, { useState } from "react";
import { Button, Card, Avatar } from "antd";
import { useDispatch } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../../redux/types";
import styled from "styled-components";

const StyledCommentMeta = styled(Card.Meta)`
  display: inline-flex;
  align-items: center;
  overflow: visible;
  .ant-card-meta-title {
    font-size: 0.9rem;
  }
`;

const CardCommentBox = styled.div`
  position: absolute;
  left: 0;
  top: 5px;
  width: 100%;
  min-height: 200px;
  max-height: 800px;
`;

const CommentCount = styled.p`
  font-size: 0.85rem;
  margin-bottom: 1.3em;
  margin-left: 5px;
  color: #a3a3a3;
`;

const CommentLists = styled.ul`
  height: 110px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const CommentList = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.8em;
`;

const CommentText = styled.span`
  margin-left: 1em;
  font-size: 0.8rem;
`;

const CommentDate = styled.span`
  margin-left: 20px;
  font-size: 0.7rem;
  color: #a3a3a3;
`;

const CardComment = () => {
  const [comment, setComment] = useState("");

  const onChange = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };

  const dispatch = useDispatch();
  const onAddComment = () => {
    dispatch({
      type: ADD_COMMENT_REQUEST,
      payload: comment,
    });
  };

  return (
    <CardCommentBox>
      <CommentCount>3개의 댓글이 있습니다.</CommentCount>
      <CommentLists>
        <CommentList>
          <StyledCommentMeta
            avatar={<Avatar size="small" src="https://picsum.photos/20" />}
            title="user1"
          />
          <CommentText>어디 케이크fdv디 케이크f</CommentText>
          <CommentDate>1일 전</CommentDate>
        </CommentList>
        <CommentList>
          <StyledCommentMeta
            avatar={<Avatar size="small" src="https://picsum.photos/20" />}
            title="user1"
          />
          <CommentText>어디 케이dfsdfsd크야???</CommentText>
          <CommentDate>1일 전</CommentDate>
        </CommentList>
        <CommentList>
          <StyledCommentMeta
            avatar={<Avatar size="small" src="https://picsum.photos/20" />}
            title="ua히힣"
          />
          <CommentText>어디 케이크야???</CommentText>
          <CommentDate>1일 전</CommentDate>
        </CommentList>
        <CommentList>
          <StyledCommentMeta
            avatar={<Avatar size="small" src="https://picsum.photos/20" />}
            title="user1"
          />
          <CommentText>어디 케이크야???</CommentText>
          <CommentDate>1일 전</CommentDate>
        </CommentList>
        <CommentList>
          <StyledCommentMeta
            avatar={<Avatar size="small" src="https://picsum.photos/20" />}
            title="user1"
          />
          <CommentText>어디 케이크야???</CommentText>
          <CommentDate>1일 전</CommentDate>
        </CommentList>
        <CommentList>
          <StyledCommentMeta
            avatar={<Avatar size="small" src="https://picsum.photos/20" />}
            title="user1"
          />
          <CommentText>어디 케이크야???</CommentText>
          <CommentDate>1일 전</CommentDate>
        </CommentList>
        <CommentList>
          <StyledCommentMeta
            avatar={<Avatar size="small" src="https://picsum.photos/20" />}
            title="user1"
          />
          <CommentText>어디 케이크야???</CommentText>
          <CommentDate>1일 전</CommentDate>
        </CommentList>
      </CommentLists>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          onChange={onChange}
          value={comment}
          placeholder="댓글 입력..."
          style={{
            position: "absolute",
            bottom: "15px",
            paddingTop: "10px",
            marginLeft: "5px",
            border: "none",
            outline: "none",
            width: "90%",
          }}
        />
        <div style={{ position: "absolute", bottom: "10px", right: "-5px" }}>
          <Button type="link" onClick={onAddComment}>
            입력
          </Button>
        </div>
      </div>
    </CardCommentBox>
  );
};

export default CardComment;