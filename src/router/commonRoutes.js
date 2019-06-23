/** @format */

import Frame from '@pages/partials/Frame'
import NotFound from '@pages/partials/NotFound'

export default [
  {
    path: '/',
    meta: {
      title: window.$appTitle
    },
    component: resolve => require(['@pages/Main'], resolve)
  },
  {
    path: '/about-arya',
    meta: {
      title: `关于 | ${window.$appTitle}`
    },
    component: Frame,
    children: [
      {
        path: '/',
        meta: {
          title: `关于 | ${window.$appTitle}`
        },
        component: resolve => require(['@pages/About'], resolve)
      }
    ]
  },
  {
    path: '/index',
    redirect: '/'
  },
  {
    path: '*',
    meta: {
      title: 'Page Not Found'
    },
    component: NotFound
  }
]
