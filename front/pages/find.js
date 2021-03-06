import { useState } from "react";
import { useDispatch } from "react-redux";
import FriendsBox from "../components/friendsBox";
import MainHeader from "../components/Header/MainHeader";
import SearchBar from "../components/searchBar";
import { LightColorBg } from "../styles/bg";

const Find = () => {
  const dispatch = useDispatch();
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
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <form onSubmit={onSubmit}>
            <div style={{ width: "95%" }}>
              <SearchBar
                onChange={onChange}
                value={term}
                placeholder="친구 검색..."
              />
            </div>
          </form>
        </div>
        <FriendsBox isFindPage />
      </div>
    </LightColorBg>
  );
};

export default Find;
