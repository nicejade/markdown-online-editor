<!-- @format -->

<template>
  <section class="header-wrapper">
    <h1 class="header-area">
      <a href="/" class="header-link">
        <img class="mark-markdown" src="@assets/images/markdown.png" alt="在线 Markdown 编辑器" />
        <strong class="header-text">{{ titleText }}</strong>
      </a>
      <div class="button-group">
        <span class="hint--bottom" @click="onAuthorClick" aria-label="关于作者">
          <icon class="header-icon" name="author" />
        </span>
        <span class="hint--bottom" @click="onAboutAryaClick" aria-label="关于 Arya">
          <icon class="header-icon" name="document" />
        </span>
        <span class="hint--bottom" @click="onThemeClick" aria-label="变更主题">
          <icon class="header-icon" name="adjust" />
        </span>
        <el-dropdown trigger="click">
          <span class="hint--bottom el-dropdown-link" aria-label="设置">
            <icon class="header-icon" name="setting" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled divided>
              <icon class="dropdown-icon" name="set-style" />
              <span class="dropdown-text">自定义样式</span>
            </el-dropdown-item>
            <el-dropdown-item disabled divided>
              <icon class="dropdown-icon" name="download" />
              <span class="dropdown-text">导出公众号</span>
            </el-dropdown-item>
            <el-dropdown-item disabled>
              <icon class="dropdown-icon" name="download" />
              <span class="dropdown-text">导出图片</span>
            </el-dropdown-item>
            <el-dropdown-item disabled>
              <icon class="dropdown-icon" name="download" />
              <span class="dropdown-text">导出 PDF </span>
            </el-dropdown-item>
            <el-dropdown-item disabled divided>
              <icon class="dropdown-icon" name="download" />
              <span class="dropdown-text">导出 HTML</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="hint--bottom full-screen" @click="onFullScreenClick" aria-label="全屏">
          <icon class="header-icon" name="full-screen" />
        </span>
      </div>
    </h1>
  </section>
</template>

<script>
import 'hint.css'

export default {
  name: 'HeaderNav',

  data() {
    return {
      titleText: window.$appTitle
    }
  },

  methods: {
    launchFullScreen() {
      const element = document.documentElement
      if (element.requestFullscreen) {
        element.requestFullscreen()
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen()
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen()
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
      }
    },
    cancelFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    },
    onAuthorClick() {
      this.$utils.openAuthorSite('header')
    },
    onAboutAryaClick() {},
    onThemeClick() {},
    onFullScreenClick() {
      const isFullScreen =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement ||
        document.webkitFullscreenElement
      isFullScreen ? this.cancelFullScreen() : this.launchFullScreen()
    }
  }
}
</script>

<style lang="scss">
[class*='hint--']:after {
  border-radius: 3px;
}
.el-popper[x-placement^='bottom'] {
  margin-top: 10px;
}
.el-dropdown .el-dropdown-link {
  height: $header-height;
  @include flex-box-center(column);
}

.hint--bottom {
  cursor: pointer;
  pointer-events: all;
}
.el-dropdown-menu {
  margin: 0;
  .dropdown-icon {
    vertical-align: middle;
    margin-right: 10px;
  }
  .dropdown-text {
    vertical-align: middle;
  }
}
.header-wrapper {
  position: fixed;
  top: 0;
  width: 100%;
  height: $header-height;
  line-height: $header-height;
  z-index: $hint-css-zindex;
  background-color: #fff;
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
  transition: border 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955),
    background 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955);
  .header-area {
    width: 80%;
    max-width: 960px;
    height: 100%;
    margin: auto;
    text-align: left;
    .header-link {
      .mark-markdown {
        width: $header-height;
        vertical-align: middle;
      }
      .header-text {
        font-size: 20px;
        color: transparent;
        background-clip: text;
        background-image: linear-gradient(to bottom, #928dab, #1f1c2c);
        vertical-align: middle;
      }
    }
    .button-group {
      float: right;
      .header-icon {
        margin: 0 10px;
      }
      .full-screen {
        margin-right: -10px;
      }
    }
  }
}
</style>
