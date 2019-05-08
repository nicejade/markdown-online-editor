/** @format */

export default {
  data() {
    const vm = this
    return {
      title: '首页',
      siteTitle: '在线 Markdown 编辑器',
      titleTemplate: '%s - ' + vm.siteTitle,
      keywords:
        'vue,vue-cli3,webpack,vuex,vue-router,element-ui,TypeScript,ESLint,Prettier,Dayjs,Markdown,Jest,PWA,开箱即用,脚手架,模板',
      description:
        '此为基于 Vue-Cli3 搭建的开箱即用 Vue 脚手架模版，致力于探究更高效地构建优质 Web 应用。'
    }
  },

  created() {},

  metaInfo() {
    const titleContent = this.title ? `${this.title} - ${this.siteTitle}` : `${this.siteTitle}`
    return {
      title: this.title,
      titleTemplate: titleChunk => {
        return titleChunk ? `${titleChunk} - ${this.siteTitle}` : `${this.siteTitle}`
      },
      meta: [
        { vmid: 'title', name: 'title', content: titleContent },
        { vmid: 'keywords', name: 'keywords', content: this.keywords },
        { vmid: 'description', name: 'description', content: this.description },
        { vmid: 'og:type', property: 'og:type', content: 'website' },
        { vmid: 'og:title', property: 'og:title', content: titleContent },
        {
          vmid: 'og:image',
          property: 'og:image',
          content: 'https://nice.lovejade.cn/logo.png'
        },
        {
          vmid: 'og:keywords',
          property: 'og:keywords',
          content: this.keywords
        },
        {
          vmid: 'og:description',
          property: 'og:description',
          content: this.description
        }
      ]
    }
  },

  mounted() {},

  methods: {}
}
