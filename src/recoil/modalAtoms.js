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

export const currentPageState = atom({
  key: "currentPage",
  default: 1,
});

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
  default: "합리적인 식사였습니다.",
});

export const dateState = atom({
  key: "date",
  default: new Date(),
});
