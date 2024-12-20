// hashRouterInit.js
import { createHashRoutes, PathToPageEnum } from "../routes/index.js";
import { Layout } from "../components/index.js";
import { RenderingEnum } from "./shared/renderingEnum.js";
import { PagesNameEnum } from "../routes/index.js";

export const hashRouterInit = () => {
  const { addRoute, render } = createHashRoutes();

  // 라우트 추가
  Object.keys(PathToPageEnum).forEach((path) => {
    const page = PathToPageEnum[path];
    if (page === PagesNameEnum.LOGIN || page === PagesNameEnum.ERROR) {
      // 로그인 및 에러 페이지는 Layout 없이 직접 렌더링
      addRoute(path, () => {
        render(() => RenderingEnum[page]());
      });
    } else {
      // 다른 페이지는 Layout으로 감싸서 렌더링
      addRoute(path, () => {
        render(() => Layout(RenderingEnum[page]));
      });
    }
  });
};
