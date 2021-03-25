import React, { useState, useEffect } from "react";
import MainHeader from "../components/Header/MainHeader";
import SearchBar from "../components/SearchBar";
import { LightColorBg } from "../styles/bg";
import { useDispatch, useSelector } from "react-redux";
import PostCardImg from "../components/PostCard/PostCardImg";
import CardContent from "../components/PostCard/CardContent";
import { Card } from "antd";
import { searchPost } from "../redux/PostSlice";

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
      {/* 검색한 게시글 렌더링 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "50px",
          alignItems: "center",
          // marginLeft: "calc(10% + 320px)",
          // paddingLeft: "10%",
        }}
      >
        {searchedPost &&
          searchedPost.length > 0 &&
          searchedPost.map((post) => (
            <Card
              style={{
                maxWidth: "500px",
                width: "93%",
                borderRadius: "30px",
                overflow: "hidden",
                boxShadow: "3px 3px 20px rgba(0,0,0,0.05)",
                marginBottom: "70px",
              }}
              cover={<PostCardImg images={post.imageUrls} />}
            >
              <CardContent post={post} />
            </Card>
          ))}
      </div>
    </LightColorBg>
  );
};

export default Search;
