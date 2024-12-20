import { RenderingEnum } from "./utils/index.js";
import { createRoutes, PathToPageEnum } from "./routes/index.js";
import { clickHandler, submitHandler } from "./utils/index.js";
import { Layout } from "./components/index.js";

export const init = () => {
  const { addRoute, render } = createRoutes();

  // 라우트 추가
  Object.keys(PathToPageEnum).forEach((path) => {
    addRoute(path, () => {
      render(() => Layout(RenderingEnum[PathToPageEnum[path]]));
    });
  });

  window.addEventListener("click", clickHandler);
  window.addEventListener("submit", submitHandler);
};
