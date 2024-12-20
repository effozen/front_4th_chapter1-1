import { clickHandler, submitHandler } from "../utils/index.js";
import { routerInit } from "./routerInit.js";

export const init = () => {
  routerInit();

  window.addEventListener("click", (event) => {
    clickHandler(event, "popstate");
  });
  window.addEventListener("submit", (event) => {
    submitHandler(event, "popstate");
  });
};