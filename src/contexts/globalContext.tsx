import React, { useState } from "react";

interface IGlobalContextProps {
  isPostOpen: boolean;
  isCommOpen: boolean;
  setIsPostOpen: (isPostOpen: boolean) => void;
  setIsCommOpen: (isCommOpen: boolean) => void;
  closeModal: () => void;
  openModal: () => void;
  openCommModal: () => void;
  closeCommModal: () => void;
}

export const GlobalContext = React.createContext<IGlobalContextProps>({
  isPostOpen: false,
  isCommOpen: false,
  setIsPostOpen: () => {},
  setIsCommOpen: () => {},
  openModal: () => {},
  closeModal: () => {},
  openCommModal: () => {},
  closeCommModal: () => {},
});

export const GlobalContextProvider = (props: any) => {
  const [isPostOpen, setIsPostOpen] = useState(false);
  const [isCommOpen, setIsCommOpen] = useState(false);

  function closeModal() {
    setIsPostOpen(false);
  }

  function openModal() {
    setIsPostOpen(true);
  }

  function openCommModal() {
    setIsCommOpen(true);
  }

  function closeCommModal() {
    setIsCommOpen(false);
  }

  return (
    <GlobalContext.Provider
      value={{
        isPostOpen: isPostOpen,
        setIsPostOpen: setIsPostOpen,
        isCommOpen: isCommOpen,
        setIsCommOpen: setIsCommOpen,
        closeModal: closeModal,
        openModal: openModal,
        openCommModal: openCommModal,
        closeCommModal: closeCommModal,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
