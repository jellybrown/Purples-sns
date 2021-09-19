import styled from "styled-components";

export const SlideWrapper = styled.section`
  width: 100%;
  background: white;
  overflow: hidden;
  position: relative;
  padding-top: 60px;
`;

export const ImageWrapper = styled.div`
  overflow: hidden;
  position: relative;
  height: 500px;
`;

export const Image = styled.img`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  min-height: 100%;
  max-height: ${({ isDesktopOrLaptop }) =>
    isDesktopOrLaptop ? "600px" : "500px"};
  min-width: 100%;
  max-width: 600px;
`;
