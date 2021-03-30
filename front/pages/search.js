import React, { useState, useEffect } from "react";
import MainHeader from "../components/Header/MainHeader";
import SearchBar from "../components/SearchBar";
import { LightColorBg } from "../styles/bg";
import { useDispatch, useSelector } from "react-redux";
import { Card, List } from "antd";
import { searchPost } from "../redux/PostSlice";
import styled from "styled-components";

const SearchLists = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  align-items: center;

  .image__wrapper {
    position: relative;
    overflow: hidden;
    height: 300px;
    border: 1px solid #cfcfcf;
  }

  img {
    height: 130%;
    min-height: 100%;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
`;

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

  return (
    <LightColorBg>
      <MainHeader />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "95%" }}>
          <SearchBar placeholder="게시글 검색..." setKeyword={setKeyword} />
        </div>
      </div>
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
              <Card className="image__wrapper">
                <img src={post.imageUrls[0]} />
              </Card>
            </List.Item>
          )}
        ></List>
      </SearchLists>
    </LightColorBg>
  );
};

export default Search;
