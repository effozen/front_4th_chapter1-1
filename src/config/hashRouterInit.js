import { createHashRoutes, HashPathToPageEnum } from "../routes/index.js";
import { Layout } from "../components/index.js";
import { RenderingEnum } from "./shared/renderingEnum.js";

export const hashRouterInit = () => {
  const { addRoute, render } = createHashRoutes();

  // 라우트 추가
  Object.keys(HashPathToPageEnum).forEach((path) => {
    addRoute(path, () => {
      render(() => Layout(RenderingEnum[HashPathToPageEnum[path]]));
    });
  });
};
