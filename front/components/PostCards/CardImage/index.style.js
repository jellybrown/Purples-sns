import styled, { css } from "styled-components";

export const ImageWrapper = styled.div`
  overflow: hidden;
  height: calc(54vh - 80px);
  position: relative;
`;

export const PostImage = styled.img`
  height: auto;
  width: auto;
  overflow: hidden;
  min-width: 100%;
  max-width: 150%;
  min-height: 400px;
  max-height: 480px;
  ${({ isDesktopOrLaptop }) =>
    !isDesktopOrLaptop &&
    css`
      min-height: 320px;
      max-height: 350px;
    `};
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
