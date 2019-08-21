<p align="center"><a href="https://nicelinks.site/tags/Markdown/?utm_source=github.com" target="_blank"><img width="100"src="https://raw.githubusercontent.com/nicejade/markdown-online-editor/master/src/assets/images/logo.png"></a></p>

<h1 align="center">
  <a href="https://markdown.lovejade.cn/?utm_source=github.com">Arya - 在线 Markdown 编辑器</a>
</h1>

<div align="center">
  <strong>
    📝 基于 <a href="https://nicelinks.site/post/5b1a221c0526c920d6dfaada">Vue</a>、<a href="https://hacpai.com/tag/vditor?utm_source=github.com">Vditor</a>，所构建的在线 <a href="https://nicelinks.site/tags/Markdown/?utm_source=github.com">Markdown</a> 编辑器，支持流程图、甘特图、时序图、任务列表、HTML 自动转换为 Markdown 等功能。<a href="https://markdown.lovejade.cn/?utm_source=github.com">markdown.lovejade.cn</a>
  </strong>
</div>

<br>

<div align="center">
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/node-%3E%3D%208.0.0-green.svg" alt="Node Version">
  </a>
  <a href="https://github.com/nicejade/markdown-online-editor">
    <img src="https://img.shields.io/github/license/nicejade/markdown-online-editor.svg" alt="LICENSE">
  </a>
  <a href="https://nicelinks.site/post/5c16083e819ae45de1453caa">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat" alt="Prettier">
  </a>
  <a href="https://www.jeffjade.com/2019/05/31/155-arya-markdown-online-editor/">
    <img src="https://img.shields.io/badge/chat-on%20blog-brightgreen.svg" alt="Arya - 在线 Markdown 编辑器">
  </a>
  <a href="https://weibo.com/aryamarkdown">
    <img src="https://img.shields.io/badge/WeiBo-aryamarkdown-red.svg?style=flat" alt="Arya - 在线 Markdown 编辑器">
  </a>
  <a href="https://aboutme.lovejade.cn/?utm_source=github.com">
    <img src="https://img.shields.io/badge/Author-nicejade-%23a696c8.svg" alt="Author nicejade">
  </a>
</div>

## 背景初衷

早期就有关注到由[黑客派](https://hacpai.com/?utm_source=github.com)所出品的 [Vditor](https://hacpai.com/tag/vditor?utm_source=github.com)：一款为未来而构建的下一代 [Markdown](https://nicelinks.site/tags/Markdown/?utm_source=github.com) 编辑器。然，现而今市面上所存在的 [Markdown](https://nicelinks.site/tags/Markdown/?utm_source=github.com) 编辑器，或多或少都存在一些问题（或功能不全，或高级功能收费...），因此基于自身所需，加之 [Vditor](https://hacpai.com/tag/vditor?utm_source=github.com) 的强大，就诞生了做一款[在线 Markdown 编辑器](https://markdown.lovejade.cn/?utm_source=github.com) 的念头；取其名曰 [`Arya`（二丫）](https://quickapp.lovejade.cn/talking-game-of-thrones/?utm_source=github.com)。

## 功能支持

- [x] 🎉 通常 `Markdown` 解析器自带的基本功能；
- [x] 🍀 支持**流程图**、**甘特图**、**时序图**、**任务列表**；
- [x] 🏁 支持粘贴 HTML 自动转换为 Markdown；
- [x] 💃🏻 支持插入原生 Emoji、设置常用表情列表；
- [x] 🚑 支持编辑内容保存**本地存储**，防止意外丢失；
- [x] 📝 支持**实时预览**，主窗口大小拖拽，字符计数；
- [x] 🛠 支持常用快捷键(**Tab**)，及代码块添加复制
- [x] ✨ 支持**导出**携带样式的 PDF、PNG、JPEG 等；
- [x] ✨ 升级 Vditor，新增对 `echarts` 图表的支持；
- [x] ✨ 注入 [RevealJs](https://revealjs.com/#/)，增设对 `PPT` 预览支持；
- [ ] 🚧 支持转换 Markdown 到**微信特制的 HTML**；
- [ ] 🚧 内置多种漂亮样式，并且支持用户**自定义**；
- [ ] 🚧 支持检查并格式化 Markdown 语法，使其专业；

## 如何使用

清空目前 [Arya](https://markdown.lovejade.cn/?utm_source=github.com) 编辑区默认文档，即可使用。

### PPT 预览

如果您用作 `PPT` 预览（入口在`设置`中），需要注意，这里暂还不能支持各种图表的渲染；您可以使用 `---` 来定义水平方向上幻灯片，用 `--` 来定义垂直幻灯片；更多设定可以参见 [RevealJs 文档](https://github.com/hakimel/reveal.js#table-of-contents)。

## 如何开发

```bash
# 🎉 克隆项目
git clone https://github.com/nicejade/markdown-online-editor.git
cd markdown-online-editor

# ➕ 安装依赖(跳过安装 )
env PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true yarn

# 🚧 开始开发
yarn start

# 🚀 部署 Github Pages(需修改 commands/deploy.sh)
yarn deploy
```

>关于本应用构建：因采用 [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin) 以解决 SPA SEO 问题，故而，您需要在根目录下创建 `arya.config.js`，根据 *arya.config.sample.js* 中示例格式，来设定 `executablePath` 参数，从而指定插件中捆绑的 **Chromium** 所在目录，使得 `prerender-spa-plugin` 可以正常工作。更多详情，可以参见 [Puppeteer 安装注意事项](https://www.jeffjade.com/2019/06/14/156-puppeteer-robot/#%E4%B8%8B%E8%BD%BD%E5%AE%89%E8%A3%85)。

## 相关链接

- [**倾城之链**](https://nicelinks.site?utm_source=github.com)
- [About Me](https://about.me/nicejade?utm_source=github.com)
- [个人博客](https://jeffjade.com/nicelinks?utm_source=github.com)
- [静轩之别苑](https://quickapp.lovejade.cn/?utm_source=github.com)
- [静晴轩别苑](https://nice.lovejade.cn/?utm_source=github.com)
- [吾意静晴轩](https://docz.lovejade.cn/?utm_source=github.com)
- [天意人间舫](https://blog.lovejade.cn/?utm_source=github.com)
- [新浪微博](https://weibo.com/jeffjade?utm_source=github.com)
- [知乎主页](https://www.zhihu.com/people/yang-qiong-pu/)
- [简书主页](https://www.jianshu.com/u/9aae3d8f4c3d)
- [SegmentFault](https://segmentfault.com/u/jeffjade)
- [Twitter](https://twitter.com/nicejadeyang)
- [Facebook](https://www.facebook.com/nice.jade.yang)

| 微信公众号 | 前端微信群 | 推荐 Web 应用 |
| --- | --- | --- |
| 😉 静晴轩 | ✨ 大前端联盟 | 🎉 倾城之链 |
| ![静晴轩](https://image.nicelinks.site/qrcode_jqx.jpg) | ![倾城之链](https://image.nicelinks.site/wqycx-weixin.png?ver=1) | <img src="https://image.nicelinks.site/nice-links.png" width="300px" alt="倾城之链"></img> |

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, [nicejade](https://aboutme.lovejade.cn/?utm_source=github.com).
