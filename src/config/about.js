/** @format */

export default `# [Arya](https://markdown.lovejade.cn/?utm_source=markdown.lovejade.cn&pid=about-arya) - 在线 Markdown 编辑器

[Arya](https://markdown.lovejade.cn/?utm_source=markdown.lovejade.cn&pid=about-arya)，是一款基于 [Vue2](https://site.lovejade.cn/post/5b1a221c0526c920d6dfaada)、[Vditor](https://github.com/Vanessa219/vditor)，为未来而构建的在线 [Markdown](https://github.com/nicejade/nice-front-end-tutorial/blob/master/tutorial/markdown-tutorial.md) 编辑器；轻量且强大：内置粘贴 HTML 自动转换为 Markdown，支持流程图、甘特图、时序图、任务列表，可导出携带样式的图片、PDF、微信公众号特制的 HTML 等等。

>**微注**：[Arya](https://markdown.lovejade.cn/?utm_source=markdown.lovejade.cn&pid=about-arya) 另一大优点在于：编辑内容只会在您本地进行保存，不会上传您的数据至服务器，**绝不窥测用户个人隐私，可放心使用**；Github 源码：[markdown-online-editor](https://github.com/nicejade/markdown-online-editor)，部分功能仍在开发🚧，敬请期待。

**背景初衷**：早期就有关注到由"黑客派"所出品的 [Vditor](https://github.com/Vanessa219/vditor)：一款为未来而构建的下一代 [Markdown](https://github.com/nicejade/nice-front-end-tutorial/blob/master/tutorial/markdown-tutorial.md) 编辑器。然，现而今市面上所存在的 \`Markdown\` 编辑器，或多或少都存在一些问题（或功能不全，或高级功能收费...），因此基于自身所需，加之 [Vditor](https://github.com/Vanessa219/vditor) 的强大，就诞生了做一款[在线 Markdown 编辑器](https://markdown.lovejade.cn/?utm_source=github.com) 的念头；取其名曰 [\`Arya\`（二丫）](https://quickapp.lovejade.cn/talking-game-of-thrones/?utm_source=markdown.lovejade.cn)。

<div align="center">
  <a href="https://nodejs.org/en/">
    <img src="https://img.shields.io/badge/node-%3E%3D%208.0.0-green.svg" alt="node version">
  </a>
  <a href="https://github.com/nicejade/markdown-online-editor">
    <img src="https://img.shields.io/github/license/nicejade/markdown-online-editor.svg" alt="LICENSE">
  </a>
  <a href="">
    <img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat" alt="Prettier">
  </a>
  <a href="https://weibo.com/aryamarkdown">
    <img src="https://img.shields.io/badge/WeiBo-aryamarkdown-red.svg?style=flat" alt="Prettier">
  </a>
  <a href="https://www.jeffjade.com/2019/05/31/155-arya-markdown-online-editor/">
    <img src="https://img.shields.io/badge/chat-on%20blog-brightgreen.svg" alt="Chat On My Blog">
  </a>
  <a href="https://aboutme.lovejade.cn/?utm_source=markdown.lovejade.cn&pid=about-arya">
    <img src="https://img.shields.io/badge/Author-nicejade-%23a696c8.svg" alt="Author nicejade">
  </a>
</div>

------

## 什么是 Markdown

\`Markdown\` 是一种方便记忆、书写的纯文本标记语言，用户可以使用这些标记符号，以最小的输入代价，生成极富表现力的文档：譬如您正在阅读的这份文档。它使用简单的符号标记不同的标题，分割不同的段落，**粗体**、*斜体* 或者[超文本链接](https://vue-cli3.lovejade.cn/explore/)，更棒的是，它还可以：

### 1. 制作待办事宜 \`Todo\` 列表

- [x] 🎉 通常 \`Markdown\` 解析器自带的基本功能；
- [x] 🍀 支持**流程图**、**甘特图**、**时序图**、**任务列表**；
- [x] 🏁 支持粘贴 HTML 自动转换为 Markdown；
- [x] 💃🏻 支持插入原生 Emoji、设置常用表情列表；
- [x] 🚑 支持编辑内容保存**本地存储**，防止意外丢失；
- [x] 📝 支持**实时预览**，主窗口大小拖拽，字符计数；
- [x] 🛠 支持常用快捷键(**Tab**)，及代码块添加复制
- [x] ✨ 支持**导出**携带样式的 PDF、PNG、HTML、JPEG 等；
- [x] ✨ 升级 Vditor，新增对 \`echarts\` 图表的支持；
- [x] ✨ 注入 [RevealJs](https://revealjs.com/#/)，增设对 \`PPT\` 预览支持；
- [x] 👏 支持检查并格式化 Markdown 语法，使其专业；
- [x] 🦑 支持五线谱、及[部分站点、视频、音频解析](https://github.com/b3log/vditor/issues/117?utm_source=hacpai.com#issuecomment-526986052)；
- [x] 🌟 增加对**所见即所得**编辑模式的支持(\`⌘-⇧-M\`)；

### 2. 书写一个质能守恒公式[^LaTeX]

$$
E=mc^2
$$

### 3. 高亮一段代码[^code]

\`\`\`js
// 给页面里所有的 DOM 元素添加一个 1px 的描边（outline）;
[].forEach.call($$("*"),function(a){
  a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16);
})
\`\`\`

### 4. 高效绘制[流程图](https://github.com/knsv/mermaid#flowchart)

\`\`\`mermaid
graph TD
    A[用户请求] --> B[语义解析]
    B --> C[RAG检索]
    
    C -->|✅ 知识库匹配| D[上下文增强]
    C -->|❌ 无匹配| E[任务分解]
    
    D --> E
    
    E --> F{工具选择}
    
    F -->|🛠️ 核心工具| G{基础操作}
    F -->|🔌 MCP扩展服务| H{MCP操作}
    
    G -->|✏️ 文件操作| I[读写/替换]
    G -->|🖥️ 系统命令执行| J[执行命令]
    G -->|🔍 代码分析| K[代码分析]
    
    H -->|⚙️ 使用MCP工具| L[使用MCP工具]
    H -->|📦 访问MCP资源| M[访问MCP资源]
    
    I --> N[结果验证]
    J --> N
    K --> N
    L --> N
    M --> N
    
    N --> O{完成判断}
    
    O -->|✅| P[提交最终结果]
    O -->|❌| E
\`\`\`

### 5. 高效绘制[序列图](https://github.com/knsv/mermaid#sequence-diagram)

\`\`\`
sequenceDiagram
  participant Alice
  participant Bob
  Alice->John: Hello John, how are you?
  loop Healthcheck
      John->John: Fight against hypochondria
  end
  Note right of John: Rational thoughts <br/>prevail...
  John-->Alice: Great!
  John->Bob: How about you?
  Bob-->John: Jolly good!
\`\`\`

\`\`\`mermaid
sequenceDiagram
  participant Alice
  participant Bob
  Alice->John: Hello John, how are you?
  loop Healthcheck
      John->John: Fight against hypochondria
  end
  Note right of John: Rational thoughts <br/>prevail...
  John-->Alice: Great!
  John->Bob: How about you?
  Bob-->John: Jolly good!
\`\`\`

### 6. 高效绘制[甘特图](https://github.com/knsv/mermaid#gantt-diagram)

>**甘特图**内在思想简单。基本是一条线条图，横轴表示时间，纵轴表示活动（项目），线条表示在整个期间上计划和实际的活动完成情况。它直观地表明任务计划在什么时候进行，及实际进展与计划要求的对比。

\`\`\`
gantt
  title 项目开发流程
  section 项目确定
    需求分析       :a1, 2019-06-22, 3d
    可行性报告     :after a1, 5d
    概念验证       : 5d
  section 项目实施
    概要设计      :2019-07-05  , 5d
    详细设计      :2019-07-08, 10d
    编码          :2019-07-15, 10d
    测试          :2019-07-22, 5d
  section 发布验收
    发布: 2d
    验收: 3d
\`\`\`

\`\`\`mermaid
  gantt
    title 项目开发流程
    section 项目确定
      需求分析       :a1, 2019-06-22, 3d
      可行性报告     :after a1, 5d
      概念验证       : 5d
    section 项目实施
      概要设计      :2019-07-05  , 5d
      详细设计      :2019-07-08, 10d
      编码          :2019-07-15, 10d
      测试          :2019-07-22, 5d
    section 发布验收
      发布: 2d
      验收: 3d
\`\`\`

### 7. 绘制表格

| 作品名称        | 在线地址   |  上线日期  |
| :--------  | :-----  | :----:  |
| 逍遥自在轩 | [https://www.niceshare.site](https://www.niceshare.site/?ref=markdown.lovejade.cn) |2024-04-26|
| 玉桃文飨轩 | [https://share.lovejade.cn](https://share.lovejade.cn/?ref=markdown.lovejade.cn) |2022-08-26|
| 缘知随心庭 | [https://fine.niceshare.site](https://fine.niceshare.site/?ref=markdown.lovejade.cn) |2022-02-26|
| 静轩之别苑 | [http://quickapp.lovejade.cn](http://quickapp.lovejade.cn/?ref=markdown.lovejade.cn) |2019-01-12|
| 晚晴幽草轩 | [https://www.jeffjade.com](https://www.jeffjade.com/?ref=markdown.lovejade.cn) |2014-09-20|

### 8. 支持部分站点、视频、音频解析

[飞雪连天射白鹿，笑书神侠倚碧鸳](https://img.hacpai.com/file/2018/11/-97d5cec5.mp4)

### 9. 更详细语法说明

想要查看更详细的语法说明，可以参考这份 [Markdown 资源列表](https://github.com/nicejade/nice-front-end-tutorial/blob/master/tutorial/markdown-tutorial.md)，涵盖入门至进阶教程，以及资源、平台等信息，能让您对她有更深的认知。

总而言之，不同于其它*所见即所得*的编辑器：你只需使用键盘专注于书写文本内容，就可以生成印刷级的排版格式，省却在键盘和工具栏之间来回切换，调整内容和格式的麻烦。**Markdown 在流畅的书写和印刷级的阅读体验之间找到了平衡。** 目前它已经成为世界上最大的技术分享网站 \`GitHub\` 和 技术问答网站 \`StackOverFlow\` 的御用书写格式，而且越发流行，正在在向各行业渗透。

---

## 相关链接

- [清风明月轩](https://www.lovejade.cn/?ref=md)
- [逍遥自在轩](https://www.niceshare.site/?ref=md)
- [晚晴幽草轩](https://www.jeffjade.com/nicelinks?ref=md)
- [玉桃文飨轩](https://share.lovejade.cn/?ref=md)
- [缘知随心庭](https://fine.niceshare.site/?ref=md)
- [静轩之别苑](https://quickapp.lovejade.cn/?ref=md)
- [悠然宜想亭](https://forum.lovejade.cn/?ref=md)
- [天意人间舫](https://blog.lovejade.cn/?utm_source=github.com)
- [SegmentFault](https://segmentfault.com/u/jeffjade)
- [X（Twitter）](https://x.com/MarshalXuan)
`
