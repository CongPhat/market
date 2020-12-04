import { debounce } from "@helper/functions";
import React, { useEffect } from "react";
interface IUseScroll {
  refCurrent: any;
}
const useScroll = (refCurrent: any, handleBottom: Function) => {
  const debounceHandleBottom = debounce(handleBottom, 100);
  let checkScrollHeight = () => {
    if (
      window.pageYOffset + window.innerHeight >=
      refCurrent.current.getBoundingClientRect().height - 500
    ) {
      debounceHandleBottom();
    }
  };
  const remove = () => {
    window.removeEventListener("scroll", checkScrollHeight);
  };
  useEffect(() => {
    window.removeEventListener("scroll", checkScrollHeight);
    window.addEventListener("scroll", checkScrollHeight);
    return () => window.removeEventListener("scroll", checkScrollHeight);
  });
  return remove;
};
export default useScroll;
