import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Button } from "antd";
import { changePostFilter } from "redux/PostSlice";
import useMediaQuery from "utils/useMediaQuery";
import PropTypes from "prop-types";
import { PostfilterWrapper } from "./index.style";

const FilterMenu = ({ secondMenu, postFilter }) => {
  const filterPostMenu = useRef();
  const dispatch = useDispatch();
  const isDesktopOrLaptop = useMediaQuery("(min-device-width: 1224px)");

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
    dispatch(changePostFilter(updatedMenu));
  };

  return (
    <PostfilterWrapper ref={filterPostMenu}>
      <div style={{ width: "130%" }}>
        {postFilter?.map((menu) => (
          <Button
            id={menu.id}
            key={menu.id}
            onClick={() => onClickMenu(menu)}
            type="link"
            style={{
              width: isDesktopOrLaptop ? "20%" : "30%",
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

FilterMenu.propTypes = {
  secondMenu: PropTypes.bool.isRequired,
  postFilter: PropTypes.array.isRequired,
};

export default FilterMenu;
