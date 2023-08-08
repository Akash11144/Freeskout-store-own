import React from "react";
export const useScrollLock = () => {
  const lockScroll = React.useCallback(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const unlockScroll = React.useCallback(() => {
    document.body.style.overflow = "";
  }, []);
  return {
    lockScroll,
    unlockScroll,
  };
};
