import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { PageEnum } from '@/enums/pageEnum'
import { setupRouterGuard, createStateGuard, createPermissionGuard } from './guard'
const basicRoutes = [
    {
        path: '/',
        name: 'Root',
        redirect: PageEnum.BASE_LOGIN,
        meta: {
            title: 'Root',
        },
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login.vue'),
        meta: {
            title: 'login',
        },
    },
    {
        path: '/index',
        name: 'index',
        component: () => import('@/views/index/Index.vue'),
        meta: {
            title: 'index',
            ignoreAuth: true,
        },
    },
]
console.log(import.meta.env.VITE_PUBLIC_PATH)
const router = createRouter({
    history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
    routes: basicRoutes as unknown as RouteRecordRaw[],
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

export const setupRouter = (app: App) => {
    setupRouterGuard(router)
    createStateGuard(router)
    createPermissionGuard(router)
    app.use(router)
}
