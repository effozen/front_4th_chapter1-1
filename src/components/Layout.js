import { Header, Footer } from "./index.js";
import { PagesNameEnum, PageToPathEnum } from "../routes/index.js";

export const Layout = (main) => {
  const currentPath = window.location.pathname;

  const isHeaderFooter =
    currentPath !== PageToPathEnum[PagesNameEnum.LOGIN] &&
    currentPath !== PageToPathEnum[PagesNameEnum.ERROR];

  return `<div class="bg-gray-100 min-h-screen flex justify-center">
    <div class="max-w-md w-full">
      ${isHeaderFooter ? Header() : ""}
      ${main()}
      ${isHeaderFooter ? Footer() : ""}
    </div>
  </div>`;
};
