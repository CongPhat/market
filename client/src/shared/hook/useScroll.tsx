import { debounce } from "@helper/functions";
import React, { useEffect } from "react";
interface IUseScroll {
  refCurrent: any;
}
const useScroll = (refCurrent: any, handleBottom: Function) => {
  const debounceHandleBottom = debounce(handleBottom, 100);
  const checkScrollHeight = () => {
    if (
      window.pageYOffset + window.innerHeight >=
      refCurrent.current.getBoundingClientRect().height - 500
    ) {
      debounceHandleBottom();
    }
    if (
      window.pageYOffset + window.innerHeight >=
      refCurrent.current.getBoundingClientRect().height
    ) {
      console.log(
        window.pageYOffset + window.innerHeight,
        "window.pageYOffset + window.innerHeight"
      );
      console.log(
        refCurrent.current.getBoundingClientRect(),
        "refCurrent.current.getBoundingClientRect()"
      );

      console.log("not scroll");

      window.removeEventListener("scroll", checkScrollHeight);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", checkScrollHeight);
  }, [refCurrent]);
  return;
};
export default useScroll;
