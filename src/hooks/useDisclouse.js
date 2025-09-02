import { useState } from "react";

const useDisclouse = () => {
  let [isOpen, setIsOpen] = useState(false);

  function onOpen() {
    setIsOpen(true);
    console.log("onOpen called");
  }
  function onClose() {
    setIsOpen(false);
  }

  return { isOpen, onOpen, onClose };
};

export default useDisclouse;
