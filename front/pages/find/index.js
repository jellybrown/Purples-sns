import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FriendsBox from "components/FriendsBox";
import MainHeader from "components/Header/MainHeader";
import SearchBar from "components/SearchBar";
import { LightColorBg } from "styles/bg";
import { searchUser } from "redux/UserSlice";
import { wrapper } from "redux/store";
import { getCookie, userLoading } from "redux/AuthSlice";
import { SearchLayout } from "./index.style";

const Find = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.user);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    dispatch(searchUser({ keyword, token }));
  }, [dispatch, keyword]);

  return (
    <LightColorBg>
      <MainHeader />
      <SearchLayout>
        <div>
          <SearchBar placeholder="사용자 검색..." setKeyword={setKeyword} />
        </div>
      </SearchLayout>
      <FriendsBox isFindPage />
    </LightColorBg>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const token = getCookie("token", context.req);
    if (token !== undefined && token !== null) {
      await context.store.dispatch(userLoading(token));
    }

    return {
      props: context.store.getState().auth,
    };
  }
);

export default Find;
