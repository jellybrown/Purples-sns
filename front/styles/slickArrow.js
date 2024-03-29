import React from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import styled from "styled-components";

// 상세 페이지용 slick arrow
// page > post > [id].js 에서 사용

export const NextArrow = ({ onClick }) => {
  return <StyledNext onClick={onClick} />;
};

export const PrevArrow = ({ onClick }) => {
  return <StyledPrev onClick={onClick} />;
};

const StyledNext = styled(GrFormNext)`
  display: block;
  opacity: 0.3;
  font-size: 40px;
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 2;
`;

const StyledPrev = styled(GrFormPrevious)`
  display: block;
  opacity: 0.3;
  font-size: 40px;
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 2;
`;
