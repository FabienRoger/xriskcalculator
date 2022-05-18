//https://usehooks.com/useWindowSize/

import { useState, useEffect } from "react";

export const useDevice = (minWidth: number): boolean => {
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= minWidth);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isDesktop;
};
