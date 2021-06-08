import React, { useCallback, useState } from "react";

const useToggle = (initialState = false) => {
  const [toggle, setToggle] = useState(initialState);

  const toggleState = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);
  return [toggle, toggleState];
};

export default useToggle;
