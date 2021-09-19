import React, { memo, useState } from "react";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NextArrow, PrevArrow } from "styles/slickArrow";
import useMediaQuery from "utils/useMediaQuery";
import { SlideWrapper, ImageWrapper, Image } from "./index.style";
import PropTypes from "prop-types";

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
          <ImageWrapper key={img}>
            <Image src={img} isDesktopOrLaptop={isDesktopOrLaptop} />
          </ImageWrapper>
        ))}
      </Slick>
    </SlideWrapper>
  );
});

ImageSlide.propTypes = {
  imageUrls: PropTypes.array.isRequired,
};

export default ImageSlide;
