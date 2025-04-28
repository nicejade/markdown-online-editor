<p align="center"><a href="https://www.niceshare.site/?ref=github.com" target="_blank"><img width="100"src="https://cdn.jsdelivr.net/gh/nicejade/markdown-online-editor/src/assets/images/logo.png"></a></p>

<h1 align="center">
  <a href="https://markdown.lovejade.cn/?ref=github.com">Arya - 在线 Markdown 编辑器</a>
</h1>

<div align="center">
  <strong>
    📝 基于 <a href="https://site.lovejade.cn/post/5b1a221c0526c920d6dfaada">Vue2</a>、<a href="https://github.com/Vanessa219/vditor">Vditor</a>，所构建的在线 Markdown 编辑器，支持绘制流程图、甘特图、时序图、任务列表、Echarts 图表、五线谱，以及 PPT 预览、视频音频解析、HTML 自动转换为 Markdown 等功能。<a href="https://markdown.lovejade.cn/?ref=github.com">markdown.lovejade.cn</a>。
  </strong>
</div>

<br>

<div align="center">
  <a href="https://github.com/nicejade/markdown-online-editor">
    <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/nicejade/markdown-online-editor">
  </a>
  <a href="https://github.com/nicejade/markdown-online-editor">
    <img src="https://img.shields.io/github/license/nicejade/markdown-online-editor.svg" alt="LICENSE">
  </a>
  <a href="https://prettier.io/">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat" alt="Prettier">
  </a>
  <a href="https://gitmoji.dev">
    <img
      src="https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square"
      alt="Gitmoji"
    />
  </a>
  <a href="https://www.jeffjade.com/2019/05/31/155-arya-markdown-online-editor/">
    <img src="https://img.shields.io/badge/chat-on%20blog-brightgreen.svg" alt="Arya - 在线 Markdown 编辑器">
  </a>
  <a href="https://v2ex.com/t/623128">
   <img src="https://img.shields.io/badge/chat-on%20v2ex-brightgreen.svg" alt="Chat On V2ex">
  </a>
  <a href="https://niceshare.site/?ref=github.com">
    <img src="https://img.shields.io/badge/Author-nicejade-%23a696c8.svg" alt="Author nicejade">
  </a>
</div>

## 背景初衷

早期就有关注到由`黑客派`所出品的 [Vditor](https://github.com/Vanessa219/vditor)：一款为未来而构建的下一代 Markdown 编辑器。然，现而今市面上所存在的 Markdown 编辑器，或多或少都存在一些问题（或功能不全，或高级功能收费...），因此基于自身所需，加之 [Vditor](https://github.com/Vanessa219/vditor) 的强大，就诞生了做一款[在线 Markdown 编辑器](https://markdown.lovejade.cn/?ref=github.com) 的念头；取其名曰 [`Arya`（二丫）](https://quickapp.lovejade.cn/talking-game-of-thrones/?ref=github.com)。

## 功能支持

- [x] 🎉 通常 `Markdown` 解析器自带的基本功能；
- [x] 🍀 支持**流程图**、**甘特图**、**时序图**、**任务列表**；
- [x] 🏁 支持粘贴 HTML 自动转换为 Markdown；
- [x] 💃🏻 支持插入原生 Emoji、设置常用表情列表；
- [x] 🚑 支持编辑内容保存**本地存储**，防止意外丢失；
- [x] 📝 支持**实时预览**，主窗口大小拖拽，字符计数；
- [x] 🛠 支持常用快捷键(**Tab**)，及代码块添加复制；
- [x] ✨ 支持**导出**携带样式的 PDF、PNG、JPEG 等；
- [x] ✨ 升级 Vditor，新增对 `echarts` 图表的支持；
- [x] ✨ 注入 [RevealJs](https://revealjs.com/#/)，增设对 `PPT` 预览支持；
- [x] 👏 支持检查并格式化 Markdown 语法，使其专业；
- [x] 🦑 支持五线谱、及[部分站点、视频、音频解析](https://github.com/Vanessa219/vditor)；
- [x] 🌟 增加对**所见即所得**编辑模式的支持(`⌘-⇧-M`)；
- [x] 🌟 新增复制到微信公众号等周边功能；
- [x] 🌟 支持导入本地 Markdown（`*.md`） 文件；

## 如何使用

清空目前 [Arya](https://markdown.lovejade.cn/?ref=github.com) 编辑区默认文档，即可使用。

默认为[所见即所得](https://b3log.org/vditor/)模式，可通过 `⌘-⇧-M`（`Ctrl-⇧-M`）进行切换；或通过以下方式：

- 所见即所得：`⌘-⌥-7`（`Ctrl-alt-7`）；
- 即时渲染：`⌘-⌥-8`（`Ctrl-alt-8`）；
- 分屏渲染：`⌘-⌥-9`（`Ctrl-alt-9`）；

### PPT 预览

如果您用作 `PPT` 预览（入口在`设置`中），需要注意，这里暂还不能支持各种图表的渲染；您可以使用 `---` 来定义水平方向上幻灯片，用 `--` 来定义垂直幻灯片；更多设定可以参见 [Reveal.js Markdown 文档](https://revealjs.com/markdown/)。

## 如何部署？

### 采用 [pm2](https://pm2.keymetrics.io/) 部署

PM2 是一个强大的生产环境进程管理器，它不仅支持通过命令行启动应用，还可以使用配置文件（通常名为 `ecosystem.config.js`）来管理复杂的部署场景。您可以通过执行如下命令实现快速部署：

```bash
# 🎉 克隆项目
git clone https://github.com/nicejade/markdown-online-editor.git
cd markdown-online-editor

# ➕ 安装依赖
yarn
yarn global add pm2

# 🔧 构建产物
yarn build

# 🚀 部署服务
cd dist
npx pm2 start "npx http-server -p 8866" --name "markdown-editor"
```

### Docker 自托管

已将最新版本使用 [Docker](https://docs.docker.com/engine/install/)  打包镜像并上传至  [Docker Hub](https://hub.docker.com/r/nicejade/markdown-online-editor)，可通过如下方式进行使用：

```shell
docker run -d -p [Your-Specified-Port]:80 nicejade/markdown-online-editor:[tagname]

# 示例：
docker run -d -p 8866:80 nicejade/markdown-online-editor:latest
```

基于如上示例，如果您在本地执行，只需打开网址——[http://localhost:8866](http://localhost:8866/) 即可访问。如果在服务器运行，可以通过 http://[Server-IP]:8866 来访问。构建 Docker 镜像过程，可参见：[如何为 markdown-online-editor 服务构建 docker 镜像？](https://memo.lovejade.cn/m/49a7b493bddeed71)。您也可以通过 **Cloudflare Pages** 或 Github Pages，托管编译产物（`dist` 目录下内容），从而实现**无需服务器情况下快速部署**。

或者**使用 [docker compose](https://docs.docker.com/compose/)**：

创建一个 `docker-compose.yml` 文件，并在其中定义服务（其中 version: '3' 指定了 Docker Compose 文件的版本；您可以根据实际情况进行调整）：

```yaml
version: '3'
services:
  markdown-editor:
    image: nicejade/markdown-online-editor:latest
    ports:
      - '8866:80'
    restart: always
```

在包含 `docker-compose.yml` 文件的目录中，运行以下命令启动服务：

```bash
docker-compose up -d
```

这将在后台启动服务，并且效果与下面的  `docker run`  命令相同。使用 Docker Compose 可以更方便地管理多个容器，并且配置更易读和维护。

## 如何开发

### 先决条件

说明用户在安装和使用前，需要准备的一些先决条件，譬如：您需要安装或升级  [Node.js](https://nodejs.org/en/)（>= `16.*`，< `18.*`），推荐使用  [Pnpm](https://pnpm.io/)  或  [Yarn](https://www.jeffjade.com/2017/12/30/135-npm-vs-yarn-detial-memo/)  作为首选包管理工具。

```bash
# 🎉 克隆项目
git clone https://github.com/nicejade/markdown-online-editor.git
cd markdown-online-editor

# ➕ 安装依赖
yarn

# 🚧 开始开发
yarn start

# 🚀 部署 Github Pages(需修改 commands/deploy.sh)
yarn deploy
```

## 特别鸣谢

[Arya](https://markdown.lovejade.cn/?utm_source=github.com) 的产生，得益于 [Vditor](https://github.com/b3log/vditor)：一款浏览器端的 Markdown 编辑器，同时也离不开 [Vue、Reveal.js 等开源库](https://github.com/nicejade/markdown-online-editor/blob/master/package.json#L25-L64)的支持，感谢 🙌。

## 相关链接

- [清风明月轩](https://www.thebettersites.com/?ref=github.com)
- [逍遥自在轩](https://www.niceshare.site/?ref=github.com)
- [晚晴幽草轩](https://www.jeffjade.com/nicelinks?ref=github.com)
- [缘知随心庭](https://fine.niceshare.site/?ref=github.com)
- [静轩之别苑](https://quickapp.lovejade.cn/?ref=github.com)
- [悠然宜想亭](https://forum.lovejade.cn/?ref=github.com)
- [SegmentFault](https://segmentfault.com/u/jeffjade)
- [X（Twitter）](https://x.com/MarshalXuan)
- [@MarshalXuan](https://www.youtube.com/@MarshalXuan)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, [nicejade](https://www.thebettersites.com).
