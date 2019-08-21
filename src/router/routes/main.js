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
          title: `导出 JPEG | ${window.$appTitle}`
        },
        component: resolve => require(['@pages/ExportImage'], resolve)
      },
      {
        path: 'png',
        meta: {
          title: `导出 PNG | ${window.$appTitle}`
        },
        component: resolve => require(['@pages/ExportImage'], resolve)
      },
      {
        path: 'pdf',
        meta: {
          title: `导出 PDF | ${window.$appTitle}`
        },
        component: resolve => require(['@pages/ExportPdf'], resolve)
      },
      {
        path: 'ppt',
        meta: {
          title: `PPT 预览 | ${window.$appTitle}`
        },
        component: resolve => require(['@pages/ExportPPT'], resolve)
      }
    ]
  }
]
