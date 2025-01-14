<template>
  <header class="header-wrapper">
    <h1 class="header-area">
      <a href="/" class="header-link" target="_self">
        <img
          class="mark-markdown"
          src="@assets/images/markdown.png"
          alt="Arya 在线 Markdown 编辑器 Logo"
        />
        <strong v-if="!isMobile" class="header-text">{{ titleText }}</strong>
      </a>
      <nav class="button-group">
        <a
          v-if="!isMobile"
          href="https://wechat.jeffjade.com/"
          class="header-link"
          target="_blank"
          rel="noopener"
        >
          <span class="hint--bottom" aria-label="公众号 Markdown 排版">
            <icon class="header-icon" name="wechat" />
          </span>
        </a>
        <a href="https://www.niceshare.site/" class="header-link" target="_blank" rel="noopener">
          <span class="hint--bottom" aria-label="逍遥自在轩">
            <icon class="header-icon" name="homepage" />
          </span>
        </a>
        <a
          v-if="!isMobile"
          href="https://x.com/MarshalXuan"
          class="header-link"
          target="_blank"
          rel="noopener"
        >
          <span class="hint--bottom" aria-label="X - 轩帅">
            <icon class="header-icon" name="x" />
          </span>
        </a>
        <a
          v-if="!isMobile"
          href="https://github.com/nicejade"
          class="header-link"
          target="_blank"
          rel="noopener"
        >
          <span class="hint--bottom" aria-label="作者 Github">
            <icon class="header-icon" name="github" />
          </span>
        </a>
        <router-link to="/about-arya" class="header-link">
          <span class="hint--bottom" aria-label="关于 Arya">
            <icon class="header-icon" name="document" />
          </span>
        </router-link>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="hint--bottom el-dropdown-link" aria-label="设置">
            <icon class="header-icon" name="setting" />
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item disabled>
              <icon class="dropdown-icon" name="set-style" />
              <a href="/export/jpeg" target="_self" class="dropdown-text">自定义样式</a>
            </el-dropdown-item>
            <el-dropdown-item command="/export/ppt" divided>
              <icon class="dropdown-icon" name="preview" />
              <a href="/export/ppt" target="_self" class="dropdown-text">
                {{ exportTextMap['/export/ppt'] }}
              </a>
            </el-dropdown-item>
            <el-dropdown-item command="/export/png" divided>
              <icon class="dropdown-icon" name="download" />
              <a href="/export/png" target="_self" class="dropdown-text">{{
                exportTextMap['/export/png']
              }}</a>
            </el-dropdown-item>
            <el-dropdown-item command="/export/jpeg">
              <icon class="dropdown-icon" name="download" />
              <a href="/export/jpeg" target="_self" class="dropdown-text">{{
                exportTextMap['/export/jpeg']
              }}</a>
            </el-dropdown-item>
            <el-dropdown-item command="/export/pdf">
              <icon class="dropdown-icon" name="download" />
              <a href="/export/pdf" target="_self" class="dropdown-text">
                {{ exportTextMap['/export/pdf'] }}
              </a>
            </el-dropdown-item>
            <el-dropdown-item command="/export/html" disabled divided>
              <icon class="dropdown-icon" name="download" />
              <a href="/export/html" target="_self" class="dropdown-text">导出 HTML</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span
          v-if="!isMobile"
          class="hint--bottom full-screen"
          @click="onFullScreenClick"
          aria-label="全屏"
        >
          <icon class="header-icon" name="full-screen" />
        </span>
      </nav>
    </h1>
  </header>
</template>

<script>
import 'hint.css'
import { exportTextMap } from '@config/constant'

export default {
  name: 'HeaderNav',

  data() {
    return {
      isMobile: window.innerWidth <= 768,
      titleText: window.$appTitle,
      exportTextMap,
    }
  },

  methods: {
    launchFullScreen() {
      const element = document.getElementById('vditor')
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
    onThemeClick() {},
    onFullScreenClick() {
      const isFullScreen =
        document.fullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement ||
        document.webkitFullscreenElement
      isFullScreen ? this.cancelFullScreen() : this.launchFullScreen()
    },
    handleCommand(command) {
      this.$router.push(command)
    },
  },
}
</script>

<style lang="less">
@import './../../assets/styles/style.less';

[class*='hint--']:after {
  border-radius: 3px;
}

.el-popper[x-placement^='bottom'] {
  margin-top: 10px;
}

.el-dropdown .el-dropdown-link {
  height: @header-height;
  .flex-box-center(column);
}

.hint--bottom {
  cursor: pointer;
  pointer-events: all;
}

.el-dropdown-menu {
  margin: 0;

  .dropdown-icon {
    fill: @deep-black;
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
  height: @header-height;
  line-height: @header-height;
  z-index: @hint-css-zindex;
  background-color: #fff;
  box-shadow: 0 0 12px 2px rgba(0, 0, 0, 0.1);
  transition: border 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955),
    background 0.5s cubic-bezier(0.455, 0.03, 0.515, 0.955);

  .header-area {
    width: 80%;
    max-width: @max-body-width;
    height: 100%;
    margin: auto;
    text-align: left;

    .header-link {
      display: inline-flex;
      height: @header-height;
      line-height: @header-height;

      .mark-markdown {
        width: @header-height;
        vertical-align: middle;
      }

      .header-text {
        margin-left: 10px;
        font-size: @font-medium;
        color: transparent;
        background-clip: text;
        background-image: linear-gradient(to right, #000000, #434343);
        vertical-align: middle;
      }
    }

    .button-group {
      float: right;

      .header-icon {
        margin: 0 10px;
        fill: @deep-black;
      }

      .full-screen {
        margin-right: -10px;
      }
    }
  }
}

@media (max-width: 960px) {
  .header-wrapper {
    .header-area {
      display: flex;
      width: 100%;
      padding: 0 10px;
      .flex-box-center(row, space-between);

      .header-link {
        display: inline;
      }
    }
  }
}
</style>
