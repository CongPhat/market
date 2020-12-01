import React from "react";
import { useRecoilValue } from "recoil";
import { recoilState } from "./recoil.manager";

const Recoil1 = () => {
  const value = useRecoilValue(recoilState);
  return <>{value}</>;
};
export default Recoil1;
