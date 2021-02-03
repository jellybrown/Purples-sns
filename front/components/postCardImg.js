import { useEffect, useState } from "react";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const Wrapper = styled.div`
  touch-action: none !important;
  overflow: hidden;
`;
const PostCardImg = () => {
  // post image 받기
  const images = [
    {
      src:
        "https://image.freepik.com/free-photo/woman-checking-calendar_53876-13451.jpg",
    },
    {
      src:
        "https://image.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg",
    },
    {
      src:
        "https://image.freepik.com/free-photo/love-yourself-concept-photo-lovely-smiling-woman-embraces-herself-has-high-self-esteem-closes-eyes-from-enjoyment_273609-25478.jpg",
    },
    {
      src:
        "https://image.freepik.com/free-photo/smiling-baby-lying-bed_1139-14.jpg?1",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  {
    /* 아직 쓸일은 없음, 나중에 있을지도 */
  }

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
        <Wrapper>
          <img
            src={img.src}
            style={{
              height: "calc(54vh - 80px)",
              width: "auto",
              margin: "0 auto",
            }}
          />
        </Wrapper>
      ))}
    </Slick>
  );
};

export default PostCardImg;
