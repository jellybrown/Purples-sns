import styled from "styled-components";

export const ContentsWrapper = styled.section`
  height: 500px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const Content = styled.article`
  padding: 2rem;
  position: relative;
  height: ${({ isDesktopOrLaptop }) => (isDesktopOrLaptop ? "300px" : "250px")};
`;

export const AuthorName = styled.p`
  text-align: right;
  font-weight: 500;
`;

export const IconWrapper = styled.div`
  z-index: 2;
  position: absolute;
  right: 1em;
  bottom: 0.5em;
  font-size: 1.4rem;
  display: flex;
`;

export const IconItem = styled.div`
  margin-left: 0.5em;
  cursor: pointer;
`;

export const Comments = styled.div`
  padding: 1em;
  p {
    text-align: right;
    color: #a3a3a3;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const Input = styled.input`
  padding-top: 10px;
  margin-left: 5px;
  border: none;
  outline: none;
  flex: 1;
`;

export const DetailWrapper = styled.section`
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  transform: translateY(-50%);
  padding-top: 60px;

  .ant-list-item-meta-avatar {
    margin-right: 10px;
  }
`;
