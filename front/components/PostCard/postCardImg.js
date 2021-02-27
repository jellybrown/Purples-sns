import { useEffect, useState } from "react";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { Carousel } from "antd";

const Wrapper = styled.div`
  overflow: hidden;
`;
const PostCardImg = () => {
  // post image 받기
  const images = [
    {
      key: "1",
      src:
        "https://image.freepik.com/free-photo/woman-checking-calendar_53876-13451.jpg",
    },
    {
      key: "2",
      src:
        "https://image.freepik.com/free-photo/wide-angle-shot-single-tree-growing-clouded-sky-during-sunset-surrounded-by-grass_181624-22807.jpg",
    },
    {
      key: "3",
      src:
        "https://image.freepik.com/free-photo/love-yourself-concept-photo-lovely-smiling-woman-embraces-herself-has-high-self-esteem-closes-eyes-from-enjoyment_273609-25478.jpg",
    },
    {
      key: "4",
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
        <Wrapper key={img.key}>
          <img
            src={img.src}
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
