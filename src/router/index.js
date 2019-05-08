/** @format */

import Vue from 'vue'
import Router from 'vue-router'
import beforeEachHooks from './beforeEachHooks'
import RoutesMapConfig from './routes'
import commonRoutesMap from './commonRoutes'

Vue.use(Router)

const routerInstance = new Router({
  mode: 'history',
  /* ~~~~~~~~~~~~~~~~~~~~~~~~@CHANGE@~~~~~~~~~~~~~~~~~~~~~~~~ */
  /*
    @desc: base,应用的基路径;如整个单页应用服务在 /app/ 下，base 就应该设为 "/app/";
    @reference: https://router.vuejs.org/zh-cn/api/options.html#base
  */
  base: '/',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: RoutesMapConfig.concat(commonRoutesMap)
})

Object.values(beforeEachHooks).forEach(hook => {
  routerInstance.beforeEach(hook)
})

export default routerInstance
