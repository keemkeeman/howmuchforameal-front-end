import { atom } from "recoil";

export const spendListState = atom({
  key: "spendList",
  default: [],
});

export const itemListState = atom({
  key: "itemList",
  default: [],
});

export const spareListState = atom({
  key: "spareList",
  default: []
})