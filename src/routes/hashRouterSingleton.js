import { PagesNameEnum, PageToPathEnum } from "./shared/enum.js";
import { checkLogin } from "../utils/auth.js";

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
      navigateTo(PageToPathEnum[PagesNameEnum.ERROR]);
    }
  };

  const handleRoute = (hash) => {
    const path = hash.replace(/^#/, ""); // '#' 제거

    if (path === "") {
      navigateTo(PageToPathEnum[PagesNameEnum.HOME]);
      return;
    }

    // 로그인 필요 경로인지 확인
    if (path === PageToPathEnum[PagesNameEnum.PROFILE] && !checkLogin()) {
      navigateTo(PageToPathEnum[PagesNameEnum.LOGIN]);
      return;
    }

    // 로그인 상태일 때 로그인 페이지로 접근 시 홈으로 이동
    if (path === PageToPathEnum[PagesNameEnum.LOGIN] && checkLogin()) {
      navigateTo(PageToPathEnum[PagesNameEnum.HOME]);
      return;
    }

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
      window.location.hash = PageToPathEnum[PagesNameEnum.LOGIN];
      handleRoute(`#${PageToPathEnum[PagesNameEnum.LOGIN]}`);
      return;
    }

    if (path === PageToPathEnum[PagesNameEnum.LOGIN] && checkLogin()) {
      window.location.hash = PageToPathEnum[PagesNameEnum.HOME];
      handleRoute(`#${PageToPathEnum[PagesNameEnum.HOME]}`);
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
