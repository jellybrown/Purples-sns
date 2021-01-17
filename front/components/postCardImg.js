import { useEffect, useState } from "react";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const Wrapper = styled.div`
  touch-action: none !important;
`;
const PostCardImg = () => {
  // post image 받기
  const images = [
    {
      src:
        "https://raw.githubusercontent.com/pegsbenedict/demos/master/img/slider2-funders.jpg",
    },
    {
      src:
        "https://raw.githubusercontent.com/pegsbenedict/demos/master/img/slider2-funders.jpg",
    },
    {
      src:
        "https://raw.githubusercontent.com/pegsbenedict/demos/master/img/slider2-funders.jpg",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Slick
      dots={true}
      beforeChange={(slide) => setCurrentSlide(slide)}
      initialSlide={0}
      slidesToShow={1}
      slidesToScroll={1}
      autoplay={true}
      autoplaySpeed={5000}
    >
      {images.map((img) => (
        <Wrapper>
          <img src={img.src} style={{ width: "600px" }} />
        </Wrapper>
      ))}
    </Slick>
  );
};

export default PostCardImg;
