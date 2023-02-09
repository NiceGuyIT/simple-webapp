import { route } from 'quasar/wrappers';
import {
    createMemoryHistory,
    createRouter,
    createWebHashHistory,
    createWebHistory,
} from 'vue-router';
import { LocalStorage } from 'quasar';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
    const createHistory = process.env.SERVER
        ? createMemoryHistory
        : process.env.VUE_ROUTER_MODE === 'history'
        ? createWebHistory
        : createWebHashHistory;

    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,

        // Leave this as is and make changes in quasar.conf.js instead!
        // quasar.conf.js -> build -> vueRouterMode
        // quasar.conf.js -> build -> publicPath
        history: createHistory(process.env.VUE_ROUTER_BASE),
    });

    // Check if the user is authenticated on every route change.
    Router.beforeEach((to, from, next) => {
        if (to.matched.some((record) => record.meta.requiresAuth)) {
            if (LocalStorage.getItem('token')) {
                next();
                return;
            }
            next('/login');
            return;
        } else {
            next();
            return;
        }
    });

    // If the user is authenticated, redirect to the dashboard if they try to access the login page.
    Router.beforeEach((to, from, next) => {
        if (to.path === '/login' && LocalStorage.getItem('token')) {
            next({
                path: '/',
            });
            return;
        } else next();
        return;
    });

    return Router;
});
