import { RoutesSingleton } from "./routerSingleton.js";
import { HashRoutesSingleton } from "./hashRouterSingleton.js";

export const createRoutes = () => {
  const { handlePopState, initialize, ...instance } =
    RoutesSingleton.getInstance();

  window.addEventListener("popstate", () => {
    handlePopState();
  });

  window.addEventListener("load", () => {
    initialize();
  });

  return { handlePopState, initialize, ...instance };
};

export const createHashRoutes = () => {
  const { handleHashChange, initialize, ...instance } =
    HashRoutesSingleton.getInstance();

  window.addEventListener("hashchange", () => {
    handleHashChange();
  });

  window.addEventListener("load", () => {
    initialize();
  });

  return { handleHashChange, initialize, ...instance };
};
