import { Input } from "antd";
import { BiSearch } from "react-icons/bi";
import styled from "styled-components";

const SearchInput = styled.input`
  color: #8c8c8c;
  border-radius: 3rem;
  border: 1px solid #cfcfcf;
  padding: 1.1em;
  width: 100%;
  text-align: center;
  outline: none;
  font-size: 1rem;
  background: #fff;
  &::placeholder {
    color: #c7c7c7;
  }
`;
const IconWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 2em;
  transform: translateY(-50%);
  cursor: pointer;
  opacity: 0.4;
  transition: 0.3s;
  &:hover {
    opacity: 1;
    transition: 0.3s;
  }
`;

const SearchBar = ({ ...props }) => {
  return (
    <div style={{ position: "relative", width: "100%", marginTop: "20px" }}>
      <SearchInput {...props} />
      <IconWrapper>
        <BiSearch
          style={{
            fontSize: "1.3rem",
            color: "#333",
          }}
        />
      </IconWrapper>
    </div>
  );
};

export default SearchBar;
