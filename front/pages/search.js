import MainHeader from "../components/MainHeader";
import SearchBar from "../components/searchBar";
import { LightColorBg } from "../styles/bg";

const Search = () => {
  return (
    <LightColorBg>
      <MainHeader />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "95%" }}>
          <SearchBar placeholder="게시글 검색..." />
        </div>
        {/* 검색한 게시글 렌더링 */}
      </div>
    </LightColorBg>
  );
};

export default Search;
