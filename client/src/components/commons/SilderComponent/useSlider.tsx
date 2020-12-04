import React, { useEffect, useState } from "react";
interface Iprops {
  countMedia: number;
}
const useSlider = (countMedia: number) => {
  const [current, setCurrent] = useState(0);
  const setSlider = (move: "prev" | "next") => {
    switch (move) {
      case "prev":
        if (current == countMedia - 1) setCurrent(0);
        else setCurrent((pre) => pre + 1);
        break;
      case "next": {
        if (current == 0) setCurrent(countMedia - 1);
        else setCurrent((pre) => pre - 1);
        break;
      }
    }
  };
  const setIndexSlider = (index: number) => {
    setCurrent(index);
  };
  return {
    setSlider,
    current,
    setIndexSlider,
  };
};
export default useSlider;
