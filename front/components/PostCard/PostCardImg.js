import React, { useState } from "react";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import useMediaQuery from "../../utils/useMediaQuery";

const Wrapper = styled.div`
  overflow: hidden;
  height: calc(54vh - 80px);
  position: relative;
  .image {
    height: auto;

    min-width: 100%;
    width: auto;
    max-width: 150%;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
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
          <img
            style={{
              maxHeight: isDesktopOrLaptop ? "480px" : "350px",
              minHeight: isDesktopOrLaptop ? "400px" : "320px",
            }}
            src={img}
            className="image"
          />
        </Wrapper>
      ))}
    </Slick>
  );
};

export default PostCardImg;
