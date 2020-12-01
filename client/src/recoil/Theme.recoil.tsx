import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  selectorFamily,
} from "recoil";

export const authLogin = atom({
  key: "authLogin",
  default: {
    privateLogin: false,
    userInfo: null,
    controlLogin: false,
  },
});
