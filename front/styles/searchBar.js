import { BiSearch } from "react-icons/bi";
import styled from "styled-components";

const SearchBar = ({ setKeyword, ...props }) => {
  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  return (
    <SearchBarWrapper>
      <SearchInput onChange={onChange} {...props} />
      <IconWrapper>
        <SearchIcon />
      </IconWrapper>
    </SearchBarWrapper>
  );
};

export default SearchBar;

const SearchBarWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
`;

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
  -webkit-appearance: none;
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

const SearchIcon = styled(BiSearch)`
  font-size: 1.1rem;
  color: #333;
`;
