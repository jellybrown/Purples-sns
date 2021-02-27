import React, { useEffect } from "react";
import { useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "antd";

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

const FilterMenu = ({ secondMenu }) => {
  const filterPostMenu = useRef();

  useEffect(() => {
    if (secondMenu) {
      filterPostMenu.current.style.transition = "0.5s";
      filterPostMenu.current.style.transform = "translateY(52px)";
    } else {
      filterPostMenu.current.style.transition = "0.5s";
      filterPostMenu.current.style.transform = "translateY(0)";
    }
  }, [secondMenu]);

  const [menuList, setMenuList] = useState([
    {
      id: 1,
      name: "All",
      active: true,
    },
    {
      id: 2,
      name: "Followings",
      active: false,
    },
    {
      id: 3,
      name: "Followers",
      active: false,
    },
    {
      id: 4,
      name: "My",
      active: false,
    },
  ]);

  const onClickMenu = (currentMenu) => {
    const updatedMenu = menuList.map((menu) => {
      const updatedItem = {
        ...menu,
        active: false,
      };

      if (menu.id === currentMenu.id) updatedItem.active = true;

      return updatedItem;
    });
    setMenuList(updatedMenu);
    console.log(updatedMenu);
  };

  return (
    <PostfilterWrapper ref={filterPostMenu}>
      <div style={{ width: "130%" }}>
        {menuList?.map((menu) => (
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
