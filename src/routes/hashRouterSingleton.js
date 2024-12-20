// hashRouterSingleton.js
import { PagesNameEnum, PageToHashPathEnum } from "./shared/enum.js";
import { checkLogin } from "../utils/index.js";

let instance = null;

// 해시 라우터 초기화 함수
const initializeHashRoutes = () => {
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
      navigateTo(PageToHashPathEnum[PagesNameEnum.ERROR]);
    }
  };

  const handleRoute = (hash) => {
    const path = hash.replace(/^#/, ""); // '#' 제거

    if (path === "") {
      navigateTo(PageToHashPathEnum[PagesNameEnum.HOME]);
      return;
    }

    const handler = routes[path];
    if (handler) {
      handler();
      return;
    }
    // 에러 처리
    navigateTo(PageToHashPathEnum[PagesNameEnum.ERROR]);
  };

  const navigateTo = (path) => {
    if (path === PageToHashPathEnum[PagesNameEnum.PROFILE] && !checkLogin()) {
      navigateTo(PageToHashPathEnum[PagesNameEnum.LOGIN]);
      return;
    }

    if (path === PageToHashPathEnum[PagesNameEnum.LOGIN] && checkLogin()) {
      navigateTo(PageToHashPathEnum[PagesNameEnum.HOME]);
      return;
    }

    window.location.hash = path; // 해시 변경
    handleRoute(`#${path}`);
  };

  const handleHashChange = () => {
    handleRoute(window.location.hash);
  };

  // 초기 로드 시 현재 해시로 navigate
  const initialize = () => {
    handleRoute(window.location.hash);
  };

  return {
    routes,
    addRoute,
    navigateTo,
    handleRoute,
    handleHashChange,
    render,
    initialize,
  };
};

// 진정한 싱글톤 객체
export const HashRoutesSingleton = {
  getInstance: () => {
    if (!instance) {
      instance = initializeHashRoutes();
    }
    return instance;
  },
};
