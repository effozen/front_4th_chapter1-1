import {
  createRoutes,
  PagesNameEnum,
  PageToPathEnum,
} from "../../routes/index.js";
import { checkLogin, logout } from "../auth.js";

export const clickHandler = (event) => {
  const { navigateTo } = createRoutes();

  if (event.target.tagName === "A") {
    event.preventDefault();

    const href = event.target.getAttribute("href");
    const id = event.target.getAttribute("id");

    if (href === PageToPathEnum[PagesNameEnum.PROFILE] && !checkLogin()) {
      navigateTo(PageToPathEnum[PagesNameEnum.LOGIN]);
      return;
    }

    if (id === "logout") {
      logout();
      return;
    }

    if (id === "login") {
      navigateTo(PageToPathEnum[PagesNameEnum.LOGIN]);
      return;
    }

    navigateTo(href);
  }
};
