import { clickHandler, submitHandler } from "../utils/index.js";
import { routerInit } from "./routerInit.js";
import { hashRouterInit } from "./hashRouterInit.js";

export const init = () => {
  routerInit();
  hashRouterInit();

  window.addEventListener("click", clickHandler);
  window.addEventListener("submit", submitHandler);
};
