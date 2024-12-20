// auth.js
import { LoginEnum } from "./shared/loginEnum.js";
import { getItem, removeItem, setItem } from "../store/localStorage.js";
import {
  createRoutes,
  PagesNameEnum,
  PageToPathEnum,
} from "../routes/index.js";

export const login = (username, passwd) => {
  const { navigateTo } = createRoutes();

  if (typeof username === "string" && typeof passwd === "string") {
    // "user" 키로 사용자 정보 저장
    setItem(LoginEnum.LOGIN_TOKEN, { username, email: "", bio: "" });
    navigateTo(PageToPathEnum[PagesNameEnum.HOME]);
  }
};

export const logout = () => {
  const { navigateTo } = createRoutes();
  removeItem(LoginEnum.LOGIN_TOKEN); // "user" 키 제거
  navigateTo(PageToPathEnum[PagesNameEnum.HOME]);
};

export const checkLogin = () => {
  return getItem(LoginEnum.LOGIN_TOKEN) !== null;
};
