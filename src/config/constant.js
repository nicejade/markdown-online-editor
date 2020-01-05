/** @format */

export const appTitle = 'Arya - 在线 Markdown 编辑器'

export const exportTextMap = {
  '/export/png': '导出 PNG',
  '/export/jpeg': '导出 JPEG',
  '/export/pdf': '导出 PDF',
  '/export/ppt': 'PPT 预览'
}

export const toolbarConf = [
  'emoji',
  'headings',
  'bold',
  'italic',
  'strike',
  'line',
  'quote',
  'list',
  'ordered-list',
  'check',
  'code',
  'inline-code',
  'undo',
  'redo',
  'upload',
  'link',
  {
    hotkey: '⌘-m',
    name: 'table',
    prefix: '| 左对齐',
    suffix: ' | 居中 | 右对齐 |\n| :--- | :---: | ---: |\n| TODO | DOING | DONE |\n|  |  |  |',
    tipPosition: 'n'
  },
  // 'table',
  // 'record',
  // 'fullscreen',
  // 'info',
  'both',
  'preview',
  {
    hotkey: '⌘-⇧-m',
    name: 'wysiwyg',
    tipPosition: 'nw'
  },
  'format',
  'devtools',
  'help'
]
