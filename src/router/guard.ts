import type {Router} from 'vue-router'
import {setRouteChange, removeTabChangeListener} from '@/utils/routerChange'
import { PageEnum } from '@/enums/pageEnum';

export function setupRouterGuard(router: Router) {
  createPageGuard(router);
}

function createPageGuard(router: Router) {
    const loadedPageMap = new Map<string, boolean>();
    router.beforeEach(async (to) => {
      to.meta.loaded = !!loadedPageMap.get(to.path);
      setRouteChange(to)
      return true;
    });
  
    router.afterEach((to) => {
      loadedPageMap.set(to.path, true);
    });
}

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    if (to.path === PageEnum.BASE_LOGIN) {
      removeTabChangeListener();
    }
  });
}

const LOGIN_PATH = PageEnum.BASE_LOGIN;

const ROOT_PATH = '/';

const whitePathList: PageEnum[] = [LOGIN_PATH];

export function createPermissionGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    if (
      from.path === ROOT_PATH &&
      to.path === PageEnum.BASE_HOME 
    ) {
      next(PageEnum.BASE_HOME);
      return;
    }

    const token = "";

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      if (to.path === LOGIN_PATH && token) {
        next((to.query?.redirect as string) || '/');
        return;
      }
      next();
      return;
    }

    // token does not exist
    if (!token) {
      // You can access without permission. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }

      // redirect login page
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      };
      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      console.log('redirectData', redirectData)
      next(redirectData);
      return;
    }

    // Jump to the 404 page after processing the login
    if (
      from.path === LOGIN_PATH &&
      to.name === '404' &&
      to.fullPath !== PageEnum.BASE_HOME
    ) {
      next(PageEnum.BASE_HOME);
      return;
    }

    // get userinfo while last fetch time is empty




    // const routes = await permissionStore.buildRoutesAction();

    // routes.forEach((route) => {
    //   router.addRoute(route as unknown as RouteRecordRaw);
    // });

    // router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);

    // permissionStore.setDynamicAddedRoute(true);

    if (to.name === '404') {
      // 动态添加路由后，此处应当重定向到fullPath，否则会加载404页面内容
      next({ path: to.fullPath, replace: true, query: to.query });
    } else {
      const redirectPath = (from.query.redirect || to.path) as string;
      const redirect = decodeURIComponent(redirectPath);
      console.log('redirect', redirectPath)
      const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
      next(nextData);
    }
  });
}