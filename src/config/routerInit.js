import { createRoutes, PathToPageEnum } from "../routes/index.js";
import { Layout } from "../components/index.js";
import { RenderingEnum } from "./shared/renderingEnum.js";

export const routerInit = () => {
  const { addRoute, render } = createRoutes();

  // 라우트 추가
  Object.keys(PathToPageEnum).forEach((path) => {
    addRoute(path, () => {
      render(() => Layout(RenderingEnum[PathToPageEnum[path]]));
    });
  });
};
