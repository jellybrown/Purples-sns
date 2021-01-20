import FriendsBox from "../components/friendsBox";
import MainHeader from "../components/MainHeader";
import SearchBar from "../components/searchBar";
import { LightColorBg } from "../styles/bg";

const Find = () => {
  return (
    <LightColorBg>
      <MainHeader />
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "95%" }}>
            <SearchBar placeholder="친구 검색..." />
          </div>
        </div>
        <FriendsBox isFindPage />
      </div>
    </LightColorBg>
  );
};

export default Find;
