import { BiSearch } from "react-icons/bi";
import styled from "styled-components";

const SearchInput = styled.input`
  color: #8c8c8c;
  border-radius: 3rem;
  border: 1px solid #cfcfcf;
  padding: 0.8em 1.1em;
  width: 100%;
  text-align: center;
  outline: none;
  font-size: 0.9rem;
  background: #fff;
  &::placeholder {
    color: #c7c7c7;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
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

const SearchBar = ({ setKeyword, ...props }) => {
  const onChange = (e) => {
    // console.log(e.target.value);
    setKeyword(e.target.value);
  };

  return (
    <div style={{ position: "relative", width: "100%", marginTop: "20px" }}>
      <SearchInput onChange={onChange} {...props} />
      <IconWrapper>
        <BiSearch
          style={{
            fontSize: "1.1rem",
            color: "#333",
          }}
        />
      </IconWrapper>
    </div>
  );
};

export default SearchBar;
