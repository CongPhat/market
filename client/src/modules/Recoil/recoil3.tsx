import React from "react";
import { useRecoilValue } from "recoil";
import { handleRecoilState1 } from "./recoil.manager";

const Recoil3 = () => {
  const valueChange = useRecoilValue(handleRecoilState1(1234));
  return <>{valueChange}</>;
};
export default Recoil3;
