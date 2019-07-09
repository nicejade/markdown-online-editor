/** @format */

/**
 * @desc executablePath: Path to a Chromium or Chrome executable to run instead of the bundled Chromium.
 * https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#puppeteerlaunchoptions
 * 此项目 prerender-spa-plugin 来预渲染 HTML；而此库基于 Puppeteer 所完成；
 * 因此在安装时需要下载 Chromium，详见：https://www.jeffjade.com/2019/06/14/156-puppeteer-robot/#%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85
 * 推荐手动下载 Chromium，通过设定 executablePath 来使用；在根目录下创建 arya.config.js，其格式如下示例；
 */
exports.executablePath = '/Users/${YOUR-PATH}/Chromium.app/Contents/MacOS/Chromium'
