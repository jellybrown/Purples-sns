import { useState } from "react";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow: hidden;
`;
const PostCardImg = ({ images }) => {
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
            src={img}
            style={{
              minHeight: "auto",
              maxHeight: "calc(54vh - 80px)",
              minWidth: "100%",
              width: "auto",
              maxWidth: "150%",
              margin: "0 auto",
            }}
          />
        </Wrapper>
      ))}
    </Slick>
  );
};

export default PostCardImg;
