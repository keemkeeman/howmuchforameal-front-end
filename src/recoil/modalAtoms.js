import { atom } from "recoil";

export const mealCountState = atom({
  key: "mealCount",
  default: 1,
});

export const totalPriceState = atom({
  key: "totalPrice",
  default: 0,
});

export const memoState = atom({
  key: "memo",
  default: "",
});

export const dateState = atom({
  key: "date",
  default: new Date(),
});

export const currentPageState = atom({
  key: "currentPage",
  default: 1,
});
