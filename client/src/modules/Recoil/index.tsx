import React from "react";
import Recoil1 from "./recoil1";
import Recoil2 from "./recoil2";
import { RecoilRoot } from "recoil";
import Recoil3 from "./recoil3";

const Recoil = () => {
  return (
    <RecoilRoot>
      <Recoil1></Recoil1>
      <br />
      <Recoil2></Recoil2>
      <br />
      <Recoil3 />
    </RecoilRoot>
  );
};
export default Recoil;
