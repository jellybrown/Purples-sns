import React, { useState } from "react";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled, { css } from "styled-components";
import useMediaQuery from "../../utils/useMediaQuery";
import PropTypes from "prop-types";

const PostCardImg = ({ images }) => {
  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Slick
      dots={true}
      beforeChange={(slide) => setCurrentSlide(slide)}
      initialSlide={0}
      slidesToShow={1}
      slidesToScroll={1}
      autoplay={false}
    >
      {images.map((img) => (
        <Wrapper key={img}>
          <Image src={img} isDesktopOrLaptop={isDesktopOrLaptop} />
        </Wrapper>
      ))}
    </Slick>
  );
};

PostCardImg.propTypes = {
  images: PropTypes.array.isRequired,
};

export default PostCardImg;

const Wrapper = styled.div`
  overflow: hidden;
  height: calc(54vh - 80px);
  position: relative;
`;

const Image = styled.img`
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
