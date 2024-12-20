import { PagesNameEnum, PageToPathEnum } from "./shared/enum.js";
import { checkLogin } from "../utils/index.js";

let instance = null;

// 라우터 초기화 함수
const initializeRoutes = () => {
  const routes = {};

  const addRoute = (path, handler) => {
    routes[path] = handler;
  };

  const render = (htmlFunction) => {
    try {
      const root = document.getElementById("root");
      const html = htmlFunction();
      if (root) {
        root.innerHTML = html;
      } else {
        document.body.innerHTML = html;
      }
    } catch (error) {
      console.error("Render Error:", error);
      navigateTo(PageToPathEnum[PagesNameEnum.ERROR]);
    }
  };

  const handleRoute = (path) => {
    if (path === "#") return;

    const handler = routes[path];
    if (handler) {
      handler();
      return;
    }
    // 에러 처리
    navigateTo(PageToPathEnum[PagesNameEnum.ERROR]);
  };

  const navigateTo = (path) => {
    if (path === PageToPathEnum[PagesNameEnum.PROFILE] && !checkLogin()) {
      navigateTo(PageToPathEnum[PagesNameEnum.LOGIN]);
      return;
    }

    if (path === PageToPathEnum[PagesNameEnum.LOGIN] && checkLogin()) {
      navigateTo(PageToPathEnum[PagesNameEnum.HOME]);
      return;
    }

    window.history.pushState({}, path, window.location.origin + path);
    handleRoute(path);
  };

  const handlePopState = () => {
    navigateTo(window.location.pathname); // popstate에서도 navigateTo 사용
  };

  // 초기 로드 시 현재 경로로 navigate
  const initialize = () => {
    navigateTo(window.location.pathname);
  };

  return {
    routes,
    addRoute,
    navigateTo,
    handleRoute,
    handlePopState,
    render,
    initialize,
  };
};

// 진정한 싱글톤 객체
export const RoutesSingleton = {
  getInstance: () => {
    if (!instance) {
      instance = initializeRoutes();
    }
    return instance;
  },
};
