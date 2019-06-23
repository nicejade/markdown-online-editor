/** @format */

import Frame from '@pages/partials/Frame'

export default [
  {
    path: '/export',
    component: Frame,
    meta: {
      title: window.$appTitle
    },
    children: [
      {
        path: 'jpeg',
        meta: {
          title: window.$appTitle
        },
        component: resolve => require(['@pages/ExportImage'], resolve)
      },
      {
        path: 'png',
        meta: {
          title: window.$appTitle
        },
        component: resolve => require(['@pages/ExportImage'], resolve)
      },
      {
        path: 'pdf',
        meta: {
          title: window.$appTitle
        },
        component: resolve => require(['@pages/ExportPdf'], resolve)
      }
    ]
  }
]
