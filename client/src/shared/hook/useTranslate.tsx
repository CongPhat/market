import { language } from "@recoil/Language.recoil";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

export const useLog = (state, text = "") => {
  useEffect(() => {
    console.log(state, text);
  }, [state]);
};

export const useTranslate = (objKey) => {
  const valueLang = useRecoilValue(language);
  const obj: any = {};
  Object.keys(objKey).map((key) => {
    obj[key] = objKey[key][valueLang];
  });
  return obj;
};
