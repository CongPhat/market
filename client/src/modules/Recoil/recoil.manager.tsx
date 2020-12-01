import { atom, selector, selectorFamily } from "recoil";

export const recoilState = atom({
  key: "recoilState",
  default: 0,
});

export const recoil1State = atom({
  key: "recoilState",
  default: [],
});

export const handleRecoilState = selector({
  key: "handleRecoilState",
  get: async ({ get }) => {
    const filter = get(recoilState);
    const filter2 = get(recoil1State);
    return filter * 10;
  },
});

export const handleRecoilState1 = selectorFamily({
  key: "handleRecoilState",
  get: (value) => async ({ get }) => {
    console.log(value, "valuevaluevalue");
    const filter = get(recoilState);
    // return filter * 10;
    return 10;
  },
});
