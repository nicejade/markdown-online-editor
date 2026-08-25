/** @format
 * Theme catalog for Arya chrome.
 * Keep ids in sync with the FOUC bootstrap in public/index.html.
 */

export const DEFAULT_THEME_ID = 'paper'

export const THEMES = [
  {
    id: 'paper',
    name: '纸墨',
    scheme: 'light',
    page: '#f7f4ee',
    swatch: ['#fffcf7', '#1c1917'],
  },
  {
    id: 'moon',
    name: '月白',
    scheme: 'light',
    page: '#eef2f6',
    swatch: ['#f8fafc', '#1e293b'],
  },
  {
    id: 'celadon',
    name: '青瓷',
    scheme: 'light',
    page: '#eef3ee',
    swatch: ['#f5faf5', '#1a2e24'],
  },
  {
    id: 'cinnabar',
    name: '朱砂',
    scheme: 'light',
    page: '#f4ebe3',
    swatch: ['#fbf6f1', '#2c1810'],
  },
  {
    id: 'night',
    name: '夜读',
    scheme: 'dark',
    page: '#14120f',
    swatch: ['#1e1b16', '#ece6da'],
  },
  {
    id: 'pine',
    name: '松烟',
    scheme: 'dark',
    page: '#0f1412',
    swatch: ['#161c1a', '#d5e0d8'],
  },
]
