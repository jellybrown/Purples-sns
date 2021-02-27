import React, { useState } from "react";
import MainHeader from "../components/Header/MainHeader";
import SearchBar from "../components/searchBar";
import { LightColorBg } from "../styles/bg";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_POST_REQUEST } from "../redux/types";

const Search = () => {
  const [keyword, setKeyword] = useState("");

  return (
    <LightColorBg>
      <MainHeader />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "95%" }}>
          <SearchBar placeholder="게시글 검색..." setKeyword={setKeyword} />
        </div>
        {/* 검색한 게시글 렌더링 */}
      </div>
    </LightColorBg>
  );
};

export default Search;
