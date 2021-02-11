import React, { useState } from "react";
import MainHeader from "../components/MainHeader";
import SearchBar from "../components/searchBar";
import { LightColorBg } from "../styles/bg";

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
