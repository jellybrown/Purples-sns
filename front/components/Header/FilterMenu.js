import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { Button } from "antd";
import { CHANGE_POST_FILTER_REQUEST } from "../../redux/types";

const PostfilterWrapper = styled.div`
  position: absolute;
  width: 100%;
  z-index: 98;
  bottom: 0;
  background: #fff;
  padding: 1em;
  white-space: nowrap;
  overflow-x: auto;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const FilterMenu = ({ secondMenu, postFilter }) => {
  const filterPostMenu = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (secondMenu) {
      filterPostMenu.current.style.transition = "0.5s";
      filterPostMenu.current.style.transform = "translateY(52px)";
    } else {
      filterPostMenu.current.style.transition = "0.5s";
      filterPostMenu.current.style.transform = "translateY(0)";
    }
  }, [secondMenu]);

  const onClickMenu = (currentMenu) => {
    const updatedMenu = postFilter.map((menu) => {
      const updatedItem = {
        ...menu,
        active: false,
      };

      if (menu.id === currentMenu.id) updatedItem.active = true;

      return updatedItem;
    });

    dispatch({
      type: CHANGE_POST_FILTER_REQUEST,
      payload: updatedMenu
    });
    console.log(updatedMenu);
  };

  return (
    <PostfilterWrapper ref={filterPostMenu}>
      <div style={{ width: "130%" }}>
        {postFilter?.map((menu) => (
          <Button
            id={menu.id}
            onClick={() => onClickMenu(menu)}
            type="link"
            style={{
              width: "30%",
              color: menu.active ? "black" : "gray",
              fontWeight: menu.active ? "bold" : "normal",
            }}
          >
            {menu.name}
          </Button>
        ))}
      </div>
    </PostfilterWrapper>
  );
};

export default FilterMenu;
