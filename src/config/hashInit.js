import { clickHandler, submitHandler } from "../utils/index.js";
import { hashRouterInit } from "./hashRouterInit.js";

export const hashInit = () => {
  hashRouterInit();

  window.addEventListener("click", (event) => {
    clickHandler(event, "hash");
  });
  window.addEventListener("submit", (event) => {
    submitHandler(event, "hash");
  });
};
