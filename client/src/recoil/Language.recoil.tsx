import { CURRENT_LANGUAGE } from "@config/index";
import { atom } from "recoil";

export const language = atom({
  key: "language",
  default: localStorage.getItem(CURRENT_LANGUAGE) || "USA",
});
