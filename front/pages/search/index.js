import React, { useState, useEffect } from "react";
import MainHeader from "components/Header";
import SearchBar from "styles/searchBar";
import { LightColorBg } from "styles/common";
import { useDispatch, useSelector } from "react-redux";
import { List } from "antd";
import { searchPost } from "redux/PostSlice";
import Router from "next/router";
import { wrapper } from "redux/store";
import { getCookie, userLoading } from "redux/AuthSlice";
import { SearchLayout, SearchLists, CardImage } from "./index.style";

const Search = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth.user);
  const [keyword, setKeyword] = useState("");
  const { data: searchedPost } = useSelector(
    (state) => state.post.searchResult
  );

  useEffect(() => {
    keyword && dispatch(searchPost({ keyword, token }));
  }, [dispatch, keyword]);

  const onClickPost = (postId) => {
    Router.push(`/post/${postId}`);
  };

  return (
    <LightColorBg>
      <MainHeader />
      <SearchLayout>
        <div>
          <SearchBar placeholder="게시글 검색..." setKeyword={setKeyword} />
        </div>
      </SearchLayout>
      <SearchLists>
        <List
          size="large"
          style={{ width: "98%" }}
          grid={{
            column: 3,
            gutter: 2,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
          }}
          dataSource={searchedPost}
          renderItem={(post) => (
            <List.Item style={{ marginBottom: "50px" }}>
              <CardImage onClick={() => onClickPost(post._id)}>
                <img src={post.imageUrls[0]} />
              </CardImage>
            </List.Item>
          )}
        ></List>
      </SearchLists>
    </LightColorBg>
  );
};

export default Search;

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
