import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FriendsBox from "../components/friendsBox";
import MainHeader from "../components/Header/MainHeader";
import SearchBar from "../components/searchBar";
import { LightColorBg } from "../styles/bg";
import { searchUser } from "../redux/UserSlice";

const Find = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.user);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    console.log("-----Find-----");
    console.log({ keyword, token });
    dispatch(searchUser({ keyword, token }));
  }, [dispatch, keyword]);

  return (
    <LightColorBg>
      <MainHeader />
      <div style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ width: "95%" }}>
            <SearchBar placeholder="사용자 검색..." setKeyword={setKeyword} />
          </div>
        </div>
        <FriendsBox isFindPage />
      </div>
    </LightColorBg>
  );
};

export default Find;
