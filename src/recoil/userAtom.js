import { atom } from "recoil";

export const currentUserState = atom({
  key: "currentUser",
  default: "",
});

export const tokenState = atom({
  key: "token",
  default: "",
});
