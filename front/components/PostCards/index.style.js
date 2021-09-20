import styled from "styled-components";
import { Alert, Card } from "antd";

export const CardWrapper = styled.div`
  width: 100%;
`;

export const CustomCard = styled(Card)`
  &&& {
    max-width: 500px;
    width: 93%;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.05);
    margin-bottom: 70px;
    margin: ${({ isDesktopOrLaptop }) =>
      isDesktopOrLaptop ? "auto" : "0 auto 50px"};
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
  }
`;

export const SpinnerWrapper = styled.div`
  text-align: center;
  padding: 50px 0;
`;

export const AlertWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CustomAlert = styled(Alert)`
  max-width: 500px;
  min-width: 140px;
  width: 93%;
  font-family: Noto Sans KR;
  font-size: 12px;
`;
