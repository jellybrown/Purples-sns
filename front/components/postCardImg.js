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
        "https://image.freepik.com/free-photo/woman-checking-calendar_53876-13451.jpg",
    },
    {
      src:
        "https://raw.githubusercontent.com/pegsbenedict/demos/master/img/slider2-funders.jpg",
    },
    {
      src:
        "https://previews.123rf.com/images/roxanabalint/roxanabalint1312/roxanabalint131200148/24476498-demo-grunge-rubber-stamp-on-white.jpg",
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
