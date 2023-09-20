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

export const startDateState = atom({
  key: "startDate",
  default: new Date(),
});

export const endDateState = atom({
  key: "endDate",
  default: null,
});

export const select1State = atom({
  key: "select1",
  default: true,
});

export const select2State = atom({
  key: "select2",
  default: false,
});
