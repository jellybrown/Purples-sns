import styled from "styled-components";

export const ContentWrapper = styled.div`
  position: relative;
  min-height: 200px;
  height: 50%;
  max-height: 800px;
  overflow: hidden;
`;

export const IconWrapper = styled.div`
  z-index: 2;
  position: absolute;
  right: 0;
  font-size: 1.4rem;
`;

export const IconItem = styled.span`
  margin-left: 0.5em;
  cursor: pointer;
`;

export const ContentText = styled.div`
  font-size: 0.85rem;
  padding-top: 1.3em;
  padding-left: 1em;
  cursor: pointer;
  font-family: "Noto Sans KR", sans-serif;
`;
