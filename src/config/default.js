/** @format */

const echartsConf = {
  backgroundColor: '#2c343c',
  title: {
    text: '「晚晴幽草轩」访问来源',
    left: 'center',
    top: 20,
    textStyle: {
      color: '#ccc'
    }
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1]
    }
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [
        { value: 10440, name: '搜索引擎', itemStyle: { color: '#ef4136' } },
        { value: 4770, name: '直接访问' },
        { value: 2430, name: '推荐' },
        { value: 342, name: '其他' },
        { value: 18, name: '社交平台' }
      ].sort(function(a, b) {
        return a.value - b.value
      }),
      roseType: 'radius',
      label: {
        normal: {
          textStyle: {
            color: 'rgba(3, 169, 244, 1)'
          }
        }
      },
      labelLine: {
        normal: {
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        }
      },
      itemStyle: {
        normal: {
          color: '#023531',
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      animationType: 'scale',
      animationEasing: 'elasticOut'
    }
  ]
}
const echartsDemoJsonStr = JSON.stringify(echartsConf, null, 2)

export default `# 欢迎使用 \`Arya\` 在线 Markdown 编辑器

[Arya](https://markdown.lovejade.cn/)，是一款基于 \`Vue\`、\`Vditor\`，为未来而构建的在线 Markdown 编辑器；轻量且强大：内置粘贴 HTML 自动转换为 Markdown，支持流程图、甘特图、时序图、任务列表，可导出携带样式的图片、PDF、微信公众号特制的 HTML 等等。

>**微注**：清空目前这份默认文档，即处于可使用态。[Arya](https://markdown.lovejade.cn/) 另一大优点在于：编辑内容只会在您本地进行保存，不会上传您的数据至服务器，**绝不窥测用户个人隐私，可放心使用**；Github 源码：[markdown-online-editor](https://github.com/nicejade/markdown-online-editor)，部分功能仍在开发🚧，敬请期待。

------

## 什么是 Markdown

[Markdown](https://nicelinks.site/tags/Markdown/?utm_source=markdown.lovejade.cn) 是一种方便记忆、书写的纯文本标记语言，用户可以使用这些标记符号，以最小的输入代价，生成极富表现力的文档：譬如您正在阅读的这份文档。它使用简单的符号标记不同的标题，分割不同的段落，**粗体**、*斜体* 或者[超文本链接](https://vue-cli3.lovejade.cn/explore/)，更棒的是，它还可以：

### 1. 制作待办事宜 \`Todo\` 列表

- [x] 🎉 通常 \`Markdown\` 解析器自带的基本功能；
- [x] 🍀 支持**流程图**、**甘特图**、**时序图**、**任务列表**；
- [x] 🏁 支持粘贴 HTML 自动转换为 Markdown；
- [x] 💃🏻 支持插入原生 Emoji、设置常用表情列表；
- [x] 🚑 支持编辑内容保存**本地存储**，防止意外丢失；
- [x] 📝 支持**实时预览**，主窗口大小拖拽，字符计数；
- [x] 🛠 支持常用快捷键(**Tab**)，及代码块添加复制
- [x] ✨ 支持**导出**携带样式的 PDF、PNG、JPEG 等；
- [x] ✨ 升级 Vditor，新增对 \`echarts\` 图表的支持；
- [ ] 🚧 支持转换 Markdown 到**微信特制的 HTML**；
- [ ] 🚧 内置多种漂亮样式，并且支持用户**自定义**；
- [ ] 🚧 支持检查并格式化 Markdown 语法，使其专业；

### 2. 书写一个质能守恒公式[^LaTeX]

$$E=mc^2$$

### 3. 高亮一段代码[^code]

\`\`\`js
// 给页面里所有的 DOM 元素添加一个 1px 的描边（outline）;
[].forEach.call($$("*"),function(a){
  a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16);
})
\`\`\`

### 4. 高效绘制[流程图](https://github.com/knsv/mermaid#flowchart)

\`\`\`mermaid
graph TD;
  A-->B;
  A-->C;
  B-->D;
  C-->D;
\`\`\`

### 5. 高效绘制[序列图](https://github.com/knsv/mermaid#sequence-diagram)

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

### 7. 支持图表

\`\`\`echarts
${echartsDemoJsonStr}
\`\`\`

>**备注：**上述图表📈，其数据，须使用严格的 **JSON** 格式；您可使用 JSON.stringify(data)，将对象传换从而得标准数据，即可正常使用。

### 8. 绘制表格

| 作品名称        | 在线地址   |  上线日期  |
| :--------  | :-----  | :----:  |
| 倾城之链 | [https://nicelinks.site](https://nicelinks.site/??utm_source=markdown.lovejade.cn) |2017-09-20|
| 晚晴幽草轩 | [https://jeffjade.com](https://jeffjade.com/??utm_source=markdown.lovejade.cn) |2014-09-20|
| 静轩之别苑 | [http://quickapp.lovejade.cn](http://quickapp.lovejade.cn/??utm_source=markdown.lovejade.cn) |2019-01-12|

### 9. 更详细语法说明

想要查看更详细的语法说明，可以参考这份 [Markdown 资源列表](https://github.com/nicejade/nice-front-end-tutorial/blob/master/tutorial/markdown-tutorial.md)，涵盖入门至进阶教程，以及资源、平台等信息，能让您对她有更深的认知。

总而言之，不同于其它*所见即所得*的编辑器：你只需使用键盘专注于书写文本内容，就可以生成印刷级的排版格式，省却在键盘和工具栏之间来回切换，调整内容和格式的麻烦。**Markdown 在流畅的书写和印刷级的阅读体验之间找到了平衡。** 目前它已经成为世界上最大的技术分享网站 \`GitHub\` 和 技术问答网站 \`StackOverFlow\` 的御用书写格式，而且越发流行，正在在向各行业渗透。
`
