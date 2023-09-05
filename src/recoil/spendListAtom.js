import { atom } from "recoil";

export const spendListState = atom({
  key: "spendList",
  default: [],
});

export const spendItemState = atom({
  key: "spendItem",
  default: {},
});
