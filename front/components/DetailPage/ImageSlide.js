import React, { memo, useState } from "react";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { NextArrow, PrevArrow } from "../../styles/slickArrow";
import useMediaQuery from "../../utils/useMediaQuery";

const SlideWrapper = styled.section`
  width: 100%;
  background: white;
  overflow: hidden;
  position: relative;
  padding-top: 60px;
  .image__wrapper {
    overflow: hidden;
    position: relative;
    height: 500px;
  }
  .image {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    min-height: 100%;
    min-width: 100%;
    max-width: 600px;
  }
`;

const ImageSlide = memo(({ imageUrls }) => {
  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <SlideWrapper
      style={{
        paddingTop: isDesktopOrLaptop ? 0 : "260px",
        height: isDesktopOrLaptop ? "500px" : "700px",
      }}
    >
      <Slick
        dots={true}
        beforeChange={(slide) => setCurrentSlide(slide)}
        initialSlide={0}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={false}
        nextArrow={
          <NextArrow onClick={(slide) => setCurrentSlide(slide + 1)} />
        }
        prevArrow={
          <PrevArrow onClick={(slide) => setCurrentSlide(slide - 1)} />
        }
      >
        {imageUrls?.map((img) => (
          <div className="image__wrapper" key={img}>
            <img
              className="image"
              src={img}
              style={{
                maxHeight: isDesktopOrLaptop ? "600px" : "500px",
              }}
            />
          </div>
        ))}
      </Slick>
    </SlideWrapper>
  );
});

export default ImageSlide;
