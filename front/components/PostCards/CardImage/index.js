import React, { useState } from "react";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useMediaQuery from "utils/useMediaQuery";
import PropTypes from "prop-types";
import { ImageWrapper, PostImage } from "./index.style";

const CardImage = ({ images }) => {
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
        <ImageWrapper key={img}>
          <PostImage src={img} isDesktopOrLaptop={isDesktopOrLaptop} />
        </ImageWrapper>
      ))}
    </Slick>
  );
};

CardImage.propTypes = {
  images: PropTypes.array.isRequired,
};

export default CardImage;
