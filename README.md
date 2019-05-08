<p align="center"><a href="https://nicelinks.site/post/5b1a221c0526c920d6dfaada" target="_blank"><img width="100"src="https://vuejs.org/images/logo.png"></a></p>

<h1 align="center"><strong>Awesome Vue-Cli3 Example </strong></h1>

<div align="center">
  <strong>
    🦅 (Vue Webpack Vuex Vue-router Element-ui/...) out of the box
  </strong>
</div>

<div align="center">
 🦅 Awesome example for rapid Vue.js development using <a href="https://github.com/vuejs/vue-cli" target="_blank">vue-cli3</a>.
</div>

<br>

<div align="center">
  <a href="https://circleci.com/gh/nicejade/awesome-vue-cli3-example">
    <img src="https://circleci.com/gh/nicejade/awesome-vue-cli3-example/tree/master.svg?style=svg" alt="Build Status">
  </a>
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/node-%3E%3D%208.0.0-green.svg" alt="node version">
  </a>
  <a href="https://github.com/nicejade/vue-boilerplate-template">
    <img src="https://img.shields.io/github/license/nicejade/vue-boilerplate-template.svg" alt="LICENSE">
  </a>
  <a href="https://nicelinks.site/post/5c16083e819ae45de1453caa">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat" alt="Prettier">
  </a>
  <a href="https://www.jeffjade.com/2019/01/13/146-awesome-vue-cli3-example/??utm_source=awesome-vue-cli3-example">
   <img src="https://img.shields.io/badge/chat-on%20blog-brightgreen.svg" alt="Chat On My Blog">
  </a>
  <a href="https://aboutme.lovejade.cn/">
    <img src="https://img.shields.io/badge/Author-nicejade-%23a696c8.svg" alt="Author nicejade">
  </a>
</div>

#### English | [中文](https://vue-cli3.lovejade.cn/??utm_source=awesome-vue-cli3-example)

## Goal and Philosophy

To facilitate developers to use `Vue-cli3` more conveniently, and to build Web applications more efficiently and reasonably.

## Prerequisites

[Node.js](https://nodejs.org/en/) (>= 8.*), Npm version 4+(Yarn preferred), and [Git](https://git-scm.com/).

## Online Demo

Online Demo Page: https://vue-cli3.lovejade.cn

## Usage

```bash
# 🎉 clone the project
git clone https://github.com/nicejade/awesome-vue-cli3-example.git your-project-name
cd your-project-name

# ➕ install dependencies & start dev
yarn && yarn start
```

## Advantage

This boilerplate built on [Vue-Cli3](https://github.com/vuejs/vue-cli/) inheriting the previous [vue-boilerplate-template](https://github.com/nicejade/vue-boilerplate-template) project to explore the more efficient construction for high-quality web applications (recommended to read [开箱即用的 Vue Webpack 脚手架模版](https://www.jeffjade.com/2018/05/20/140-vue-webpack-boilerplate-template/)), Some optimization items are designed, the specific list as followed:

- [x] Import & configure [Vue-router](https://router.vuejs.org/zh/) to make the building of a single-page application (SPA) breeze;
- [x] Import & configure [Vuex](https://vuex.vuejs.org/zh/) to handle the management of status for application development;
- [x] Import [Element-ui](http://element.eleme.io/#/zh-CN) to build a website quickly without paying too much attention to the UI;
- [x] Import & encapsulating [Axios](https://github.com/axios/axios) to response the Http requests more elegant;
- [x] Import [Dayjs](https://github.com/iamkun/dayjs) to handle date-time correlation in a slight cost;
- [x] Import & encapsulate the [Marked]() plugin so that it can be used as a rich text editor,and it also can achieve `Markdown` to draw the page due to its parsing function.
- [x] Import [vue-meta](https://github.com/declandewet/vue-meta) plugin so that allows you to manage your app's meta information, much like [react-helmet](https://github.com/nfl/react-helmet) does for React. It'm awesome for `SEO`.
- [x] Making the optimization based on the new features of `Webepack 4.*`. Getting the details on `vue.config.js`;
- [x] Opening & using [Jest](https://jestjs.io/) to test the component with the Demo;
- [x] Integrate & configure the [Prettier](https://prettier.io/) plugin to enable the team to code with better and consistent style. Getting the details on the [使用 ESLint ＆ Prettier美化Vue代码](https://www.jeffjade.com/2018/06/18/142-beautify-vue-by-eslint-and-prettier/);
- [x] Import [cli-plugin-pwa](https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa) plugin，and configure in \`vue.config.js\` ，you can get started easily with [PWA](https://github.com/nicejade/nice-front-end-tutorial/blob/master/tutorial/pwa-tutorial.md) using Vue;
- [x] Import the [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin) plugin to pre-render static HTML, optimizing SEO and first-screen rendering in a single-page application .
- [x] Import the [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) plugin so that to get the contents of the building packages with optimization while running `Yarn analyz`. Getting the details: [Webpack 打包优化之体积篇](https://jeffjade.com/2017/08/06/124-webpack-packge-optimization-for-volume/#%E5%AE%9A%E4%BD%8D-webpack-%E5%A4%A7%E7%9A%84%E5%8E%9F%E5%9B%A0).
- [x] Import the [size-plugin](https://github.com/GoogleChromeLabs/size-plugin)  plugin to print the Gzip size of the Webpack asset and the changes since the last building while building the app.
- [x] Import the [hard-source-webpack-plugin](https://github.com/mzgoddard/hard-source-webpack-plugin) plugin for webpack to provide an intermediate caching step for modules. It make the second build will be signficantly faster.
- [x] The combination of this scaffolding with Node.js (Koa2) Nginx MondoDb Redis is integrated into Docker to make Front-End Developer build easily the entire web application.Its currently open sourced in [Docker Vue Node Nginx Mongodb Redis](https://github.com/nicejade/docker-vue-node-nginx-mongodb-redis).
-  [ ] Optimizing the built-in `Icon` (Svg) component so that you can receive input in different ways and extract Svg into a separate file to avoid repeated loading of resources;

>**TIP**: [prerender-spa-plugin](https://github.com/chrisvfritz/prerender-spa-plugin): Prerenders static HTML in a single-page application. But, it is not required. If you don't need it, you can remove it. Because it requires a lot of dependencies([puppeteer](https://github.com/GoogleChrome/puppeteer)，Chromium: ~170MB Mac, ~282MB Linux, ~280MB Win) to download, this is time consuming.

## Recommended links

- [**NICE LINKS**](https://nicelinks.site/?utm_source=awesome-vue-cli3-example)
- [About Me](https://about.me/nicejade/?utm_source=awesome-vue-cli3-example)
- [Latest Blog](https://quickapp.lovejade.cn/?utm_source=awesome-vue-cli3-example)
- [First Blog](https://jeffjade.com/?utm_source=awesome-vue-cli3-example)
- [Second Blog](https://nice.lovejade.cn/?utm_source=awesome-vue-cli3-example)
- [Auxiliary blog](https://blog.lovejade.cn/?utm_source=awesome-vue-cli3-example)
- [Weibo](http://weibo.com/jeffjade/)
- [ZhiHu](https://www.zhihu.com/people/yang-qiong-pu/)
- [SegmentFault](https://segmentfault.com/u/jeffjade)
- [JianShu](http://www.jianshu.com/u/9aae3d8f4c3d)
- [Twitter](https://twitter.com/nicejadeyang)
- [Facebook](https://www.facebook.com/nice.jade.yang)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, [nicejade](https://aboutme.lovejade.cn/?utm_source=awesome-vue-cli3-example).