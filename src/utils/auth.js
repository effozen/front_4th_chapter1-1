// auth.js
import { LoginEnum } from "./shared/index.js";
import { getItem, removeItem, setItem } from "../store/localStorage.js";
import {
  generalRoutes,
  PagesNameEnum,
  PageToPathEnum,
} from "../routes/index.js";

export const login = (username, passwd, type = "popstate") => {
  const { navigateTo } = generalRoutes(type);

  if (typeof username === "string" && typeof passwd === "string") {
    // "user" 키로 사용자 정보 저장
    setItem(LoginEnum.LOGIN_TOKEN, { username, email: "", bio: "" });
    navigateTo(PageToPathEnum[PagesNameEnum.HOME]);
  }
};

export const logout = (type = "popstate") => {
  const { navigateTo } = generalRoutes(type);
  removeItem(LoginEnum.LOGIN_TOKEN); // "user" 키 제거
  navigateTo(PageToPathEnum[PagesNameEnum.LOGIN]);
};

export const checkLogin = () => {
  return getItem(LoginEnum.LOGIN_TOKEN) !== null;
};
