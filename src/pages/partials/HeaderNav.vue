<template>
  <header class="header-wrapper">
    <div class="header-area">
      <a href="/" class="header-brand" target="_self">
        <img
          class="mark-markdown"
          src="@assets/images/markdown.png"
          alt="Arya 在线 Markdown 编辑器 Logo"
        />
        <strong v-if="!isMobile" class="header-text">{{ titleText }}</strong>
      </a>
      <nav class="button-group" aria-label="主导航">
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
        <a href="https://www.lovejade.cn/" class="header-link" target="_blank" rel="noopener">
          <span class="hint--bottom" aria-label="清风明月轩">
            <icon class="header-icon" name="home" />
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
        <span class="hint--bottom header-action" @click="onImportClick" aria-label="导入文件">
          <icon class="header-icon" name="upload" />
        </span>
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="hint--bottom el-dropdown-link header-action" aria-label="设置">
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
            <el-dropdown-item command="/export/pdf">
              <icon class="dropdown-icon" name="download" />
              <a href="/export/pdf" target="_self" class="dropdown-text">
                {{ exportTextMap['/export/pdf'] }}
              </a>
            </el-dropdown-item>
            <el-dropdown-item command="/export/docx">
              <icon class="dropdown-icon" name="download" />
              <a href="/export/docx" target="_self" class="dropdown-text">
                {{ exportTextMap['/export/docx'] }}
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
          class="hint--bottom full-screen header-action"
          @click="onFullScreenClick"
          aria-label="全屏"
        >
          <icon class="header-icon" name="full-screen" />
        </span>
      </nav>
    </div>
  </header>
</template>

<script>
import 'hint.css'
import { exportTextMap } from '@config/constant'
import { createDocument, setActiveDocId, saveDocContent } from '@helper/storage'
import { trackEvent } from '@helper/analytics'

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
      trackEvent('header_full_screen', 'header', isFullScreen ? 'exit' : 'enter')
    },
    handleCommand(command) {
      this.$router.push(command)
      trackEvent('header_export', 'header', command)
    },
    onImportClick() {
      trackEvent('header_import_click', 'header')
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.md,.markdown,text/markdown'
      input.onchange = (e) => {
        const file = e.target.files[0]
        if (file) {
          const reader = new FileReader()
          reader.onload = (e) => {
            const content = e.target.result
            const title = (file.name || '').replace(/\.(md|markdown)$/i, '') || '导入的文档'
            const doc = createDocument(title)
            saveDocContent(doc.id, content)
            setActiveDocId(doc.id)
            this.$root.$emit('reload-content')
            trackEvent('header_import_success', 'header', title)
          }
          reader.readAsText(file)
        }
      }
      input.click()
    },
  },
}
</script>

<style lang="less">
@import './../../assets/styles/style.less';

// Shared hit target for every header control (optical equality)
@header-hit: 32px;
@header-icon-size: 16px;

[class*='hint--']:after {
  border-radius: 6px;
  background: fade(@text-primary, 92%) !important;
  font-family: @font-family !important;
  font-size: 11px !important;
  font-weight: 500;
  letter-spacing: -0.01em;
  box-shadow: @shadow-sm;
  padding: 5px 8px !important;
}

.el-popper[x-placement^='bottom'] {
  margin-top: 6px;
}

.hint--bottom {
  cursor: pointer;
  pointer-events: all;
}

// Dropdown icons inside the floating menu
.el-dropdown-menu {
  .dropdown-icon {
    fill: @text-secondary;
    vertical-align: middle;
    margin-right: 10px;
    width: 15px;
    height: 15px;
    opacity: 0.9;
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
  z-index: @hint-css-zindex;
  background: fade(@bg-page, 90%);
  backdrop-filter: blur(14px) saturate(130%);
  -webkit-backdrop-filter: blur(14px) saturate(130%);
  border-bottom: 1px solid @border-hairline;
  box-shadow: none;

  .header-area {
    width: 100%;
    height: 100%;
    padding: 0 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    .header-brand {
      display: inline-flex;
      align-items: center;
      height: @header-height;
      text-decoration: none;
      min-width: 0;
      transition: opacity @duration-fast @ease-out;

      &:hover {
        opacity: 0.7;
      }

      .mark-markdown {
        width: 24px;
        height: 24px;
        object-fit: contain;
        border-radius: 5px;
        opacity: 0.94;
      }

      .header-text {
        margin-left: 10px;
        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.015em;
        color: @text-primary;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .button-group {
      display: flex;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
      height: @header-height;

      // Every control shares the same geometry
      .header-link,
      .header-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: @header-hit;
        height: @header-hit;
        border-radius: 8px;
        line-height: 1;
        transition: background @duration-fast @ease-out;

        &:hover {
          background: fade(@text-primary, 5%);
        }

        &:active {
          background: fade(@text-primary, 8%);
        }
      }

      .header-icon {
        margin: 0;
        width: @header-icon-size;
        height: @header-icon-size;
        fill: @text-secondary;
        opacity: 0.82;
        transition: opacity @duration-fast @ease-out, fill @duration-fast @ease-out;
        // Optical: dense glyphs (gear) read heavier — keep box equal
        display: block;
      }

      .header-link:hover .header-icon,
      .header-action:hover .header-icon {
        fill: @text-primary;
        opacity: 1;
      }

      // Settings: gear is visually dense — slight optical shrink
      .icon-setting {
        width: 15px !important;
        height: 15px !important;
        transform: translateY(0);
      }

      .full-screen {
        margin-right: 0;
      }

      // Fix Element dropdown breaking header alignment
      .el-dropdown {
        display: inline-flex;
        align-items: center;
        height: @header-hit;
        vertical-align: middle;

        .el-dropdown-link {
          display: inline-flex !important;
          align-items: center;
          justify-content: center;
          width: @header-hit !important;
          height: @header-hit !important;
          min-height: @header-hit !important;
          line-height: 1 !important;
          border-radius: 8px;
          padding: 0 !important;
          border: none !important;
          background: transparent;
          outline: none !important;
          box-shadow: none !important;
          transition: background @duration-fast @ease-out;

          &:hover {
            background: fade(@text-primary, 5%);
          }

          &:active {
            background: fade(@text-primary, 8%);
          }

          &:focus {
            outline: none !important;
            background: fade(@text-primary, 5%);
          }
        }

        // When menu is open, keep a quiet pressed state
        &.is-active .el-dropdown-link,
        .el-dropdown-selfdefine:focus {
          background: fade(@text-primary, 6%);
        }
      }
    }
  }
}

@media (max-width: 960px) {
  .header-wrapper {
    .header-area {
      padding: 0 10px;

      .header-brand .mark-markdown {
        width: 22px;
        height: 22px;
      }

      .button-group {
        gap: 0;

        .header-link,
        .header-action {
          width: 30px;
          height: 30px;
        }

        .el-dropdown {
          height: 30px;

          .el-dropdown-link {
            width: 30px !important;
            height: 30px !important;
            min-height: 30px !important;
          }
        }
      }
    }
  }
}
</style>
