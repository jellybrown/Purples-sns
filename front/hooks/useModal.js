import React, { useCallback, useState } from "react";

const useModal = (initialState = false) => {
  const [modal, setModal] = useState(initialState);

  const openModal = useCallback(() => {
    setModal(true);
  });
  const closeModal = useCallback(() => {
    setModal(false);
  });
  return [modal, openModal, closeModal];
};

export default useModal;
