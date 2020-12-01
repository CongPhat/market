import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { recoil1State, recoilState } from "./recoil.manager";

const Recoil2 = () => {
  const setRecoil = useSetRecoilState(recoilState);
  const valueChange = useRecoilValue(recoil1State);
  console.log(valueChange);

  const handleCong = (e) => {
    setRecoil((pre) => pre + 1);
  };
  const handleTru = (e) => {
    setRecoil((pre) => pre - 1);
  };
  return (
    <>
      {/* <input type="text" name="" id="" onChange={handleChange} /> */}
      <button onClick={handleCong}>Cong</button>
      <button onClick={handleTru}>Tru</button>
    </>
  );
};
export default Recoil2;
