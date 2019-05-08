/** @format */

import NotFound from '@pages/partials/NotFound'

export default [
  {
    path: '/',
    meta: {
      title: '在线 Markdown 编辑器',
      ignoreAuth: true
    },
    component: resolve => require(['@pages/index'], resolve)
  },
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '*',
    meta: {
      title: 'Page Not Found',
      ignoreAuth: true
    },
    component: NotFound
  }
]
