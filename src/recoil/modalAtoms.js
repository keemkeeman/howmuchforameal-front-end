import { atom } from "recoil";

export const openAddSpendState = atom({
  key: "openAddSpend",
  default: false,
});

export const openAddMealState = atom({
  key: "openAddMeal",
  default: false,
});

export const plusOpenState = atom({
  key: "plusOpen",
  default: false,
});

export const itemNameState = atom({
  key: "itemName",
  default: "",
});

export const mealCountState = atom({
  key: "mealCount",
  default: 0,
});

export const priceState = atom({
  key: "price",
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

export const loadingState = atom({
  key: "loading",
  default: false,
});
