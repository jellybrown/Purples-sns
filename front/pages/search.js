import { useState } from "react";
import MainHeader from "../components/MainHeader";
import SearchBar from "../components/searchBar";
import { LightColorBg } from "../styles/bg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_POST_REQUEST } from "../redux/types";

const Search = () => {
  const dispatch = useDispatch();

  const searched = useSelector((state) => state.post.searchPost);

  const [term, setTerm] = useState();

  const onChange = (e) => {
    setTerm(e.target.value);
  };
  const onSubmit = () => {
    dispatch({
      type: SEARCH_POST_REQUEST,
      payload: term,
    });
  };
  return (
    <LightColorBg>
      <MainHeader />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form onSubmit={onSubmit}>
          <div style={{ width: "95%" }}>
            <SearchBar
              onChange={onChange}
              value={term}
              placeholder="게시글 검색..."
            />
          </div>
        </form>
        {/* searched?.map(() => ) */}
      </div>
    </LightColorBg>
  );
};

export default Search;
