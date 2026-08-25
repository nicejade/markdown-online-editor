<!-- @format -->

<template>
  <header class="header-wrapper">
    <div class="header-area">
      <div class="header-leading">
        <button
          v-if="showSidebarToggle"
          type="button"
          class="header-sidebar-toggle"
          aria-label="文档列表"
          title="文档列表"
          @click="$emit('toggle-sidebar')"
        >
          <icon class="header-icon" name="sidebar" />
        </button>
        <a href="/" class="header-brand" target="_self" :aria-label="titleText">
          <img
            class="mark-markdown mark-markdown--light"
            src="@assets/images/markdown.png"
            alt="Arya 在线 Markdown 编辑器 Logo"
          />
          <img
            class="mark-markdown mark-markdown--dark"
            src="@assets/images/markdown-white.png"
            alt=""
            aria-hidden="true"
          />
          <strong v-if="!isMobile" class="header-text">Arya</strong>
        </a>
      </div>
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
        <span v-if="!isMobile" class="header-divider" aria-hidden="true"></span>
        <router-link to="/about-arya" class="header-link">
          <span class="hint--bottom" aria-label="关于 Arya">
            <icon class="header-icon" name="document" />
          </span>
        </router-link>
        <span class="hint--bottom header-action" @click="onImportClick" aria-label="导入文件">
          <icon class="header-icon" name="upload" />
        </span>
        <span
          v-if="!isMobile"
          class="hint--bottom full-screen header-action"
          @click="onFullScreenClick"
          aria-label="全屏"
        >
          <icon class="header-icon" name="full-screen" />
        </span>
        <el-dropdown trigger="click" @command="onSelectTheme" placement="bottom-end">
          <button
            type="button"
            class="header-action"
            :aria-label="'切换主题，当前：' + currentThemeName"
            :title="'切换主题，当前：' + currentThemeName"
          >
            <icon class="header-icon" name="adjust" />
          </button>
          <el-dropdown-menu slot="dropdown" class="theme-picker">
            <el-dropdown-item
              v-for="theme in themes"
              :key="theme.id"
              :command="theme.id"
              :class="{ 'is-current': theme.id === currentThemeId }"
            >
              <span class="theme-picker-item">
                <span class="theme-swatch" aria-hidden="true">
                  <span class="theme-swatch__paper" :style="{ background: theme.swatch[0] }"></span>
                  <span class="theme-swatch__ink" :style="{ background: theme.swatch[1] }"></span>
                </span>
                <span class="theme-picker-name">{{ theme.name }}</span>
                <i class="el-icon-check theme-picker-check" aria-hidden="true"></i>
              </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown class="header-export" trigger="click" @command="handleCommand">
          <button type="button" class="header-cta" aria-label="导出">
            <icon class="header-cta-icon" name="download" />
            <span class="header-cta-label">导出</span>
          </button>
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
            <el-dropdown-item command="/export/html" divided>
              <icon class="dropdown-icon" name="download" />
              <a href="/export/html" target="_self" class="dropdown-text">
                {{ exportTextMap['/export/html'] }}
              </a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </nav>
    </div>
  </header>
</template>

<script>
import 'hint.css'
import { exportTextMap } from '@config/constant'
import { createDocument, setActiveDocId, saveDocContent } from '@helper/storage'
import { THEMES, getThemeId, applyTheme } from '@helper/theme'
import { trackEvent } from '@helper/analytics'

export default {
  name: 'HeaderNav',

  props: {
    showSidebarToggle: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isMobile: window.innerWidth <= 768,
      titleText: window.$appTitle,
      exportTextMap,
      themes: THEMES,
      currentThemeId: getThemeId(),
    }
  },

  computed: {
    currentThemeName() {
      const current = this.themes.find((theme) => theme.id === this.currentThemeId)
      return current ? current.name : '纸墨'
    },
  },

  mounted() {
    window.addEventListener('resize', this.onResize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth <= 768
    },
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
    onSelectTheme(id) {
      const theme = applyTheme(id)
      this.currentThemeId = theme.id
      trackEvent('header_theme', 'header', theme.id)
    },
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
  background: @text-a92 !important;
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
  top: @header-offset;
  left: @page-gutter;
  right: @page-gutter;
  height: @header-height;
  z-index: 150;
  background: transparent;
  border: none;
  box-shadow: none;
  pointer-events: none;

  .header-area {
    pointer-events: auto;
    width: 100%;
    height: 100%;
    padding: 0 8px 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    background: @nav-bg;
    backdrop-filter: blur(@glass-blur) saturate(@glass-saturate);
    -webkit-backdrop-filter: blur(@glass-blur) saturate(@glass-saturate);
    border: 1px solid @border-hairline;
    border-radius: @radius-pill;
    box-shadow: @shadow-pill;

    .header-leading {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      min-width: 0;
      height: 100%;
    }

    .header-sidebar-toggle {
      width: @header-hit;
      height: @header-hit;
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
      border: none;
      border-radius: @radius-pill;
      background: transparent;
      color: @icon-grey;
      cursor: pointer;
      transition: background @duration-fast @ease-out, color @duration-fast @ease-out;

      &:hover {
        background: @text-a04;
        color: @text-primary;
      }

      .header-icon {
        width: @header-icon-size;
        height: @header-icon-size;
        fill: currentColor;
      }
    }

    .header-brand {
      display: inline-flex;
      align-items: center;
      height: 100%;
      text-decoration: none;
      min-width: 0;
      transition: opacity @duration-fast @ease-out;
      cursor: pointer;

      &:hover {
        opacity: 0.72;
      }

      .mark-markdown {
        width: 26px;
        height: 26px;
        object-fit: contain;
        border-radius: 8px;
        opacity: 0.96;
      }

      .mark-markdown--dark {
        display: none;
      }

      .header-text {
        margin-left: 10px;
        font-family: @font-serif;
        font-size: 18px;
        font-weight: 500;
        font-style: italic;
        letter-spacing: -0.02em;
        color: @text-primary;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 1;
      }
    }

    .button-group {
      display: flex;
      align-items: center;
      gap: 2px;
      flex-shrink: 0;
      height: 100%;

      .header-divider {
        width: 1px;
        height: 16px;
        margin: 0 8px;
        background: @separator;
        flex-shrink: 0;
      }

      .header-link,
      .header-action {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: @header-hit;
        height: @header-hit;
        margin: 0;
        padding: 0;
        border: none;
        background: transparent;
        appearance: none;
        -webkit-appearance: none;
        border-radius: @radius-pill;
        line-height: 1;
        cursor: pointer;
        transition: background @duration-fast @ease-out;

        &:hover {
          background: @text-a05;
        }

        &:active {
          background: @text-a08;
        }
      }

      .header-icon {
        margin: 0;
        width: @header-icon-size;
        height: @header-icon-size;
        fill: @text-secondary;
        color: @text-secondary;
        opacity: 0.72;
        filter: grayscale(1);
        transition: opacity @duration-fast @ease-out, filter @duration-fast @ease-out;
        display: block;
      }

      .header-link:hover .header-icon,
      .header-action:hover .header-icon {
        fill: @text-primary;
        color: @text-primary;
        opacity: 1;
      }

      .full-screen {
        margin-right: 2px;
      }

      .el-dropdown {
        display: inline-flex;
        align-items: center;
        height: auto;
        vertical-align: middle;
      }

      .header-export {
        margin-left: 6px;
      }

      .header-cta {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        height: 36px;
        padding: 0 16px 0 14px;
        border: none;
        border-radius: @radius-pill;
        background: @cta;
        color: @cta-fg;
        font-family: @font-family;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: -0.01em;
        line-height: 1;
        cursor: pointer;
        box-shadow: none;
        transition: background @duration-fast @ease-out, transform @duration-fast @ease-out;

        &:hover,
        &:focus {
          background: @cta-hover;
          outline: none;
        }

        &:active {
          transform: scale(0.98);
        }

        .header-cta-icon {
          width: 14px;
          height: 14px;
          fill: currentColor;
          display: block;
        }

        .header-cta-label {
          line-height: 1;
        }
      }
    }
  }
}

[data-scheme='dark'] .header-wrapper .header-area .header-brand {
  .mark-markdown--light {
    display: none;
  }

  .mark-markdown--dark {
    display: block;
  }
}

.theme-picker {
  min-width: 168px !important;
}

.theme-picker-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.theme-swatch {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
  display: inline-flex;
  flex-shrink: 0;
  box-shadow: inset 0 0 0 1px rgba(127, 127, 127, 0.35);
}

.theme-swatch__paper,
.theme-swatch__ink {
  flex: 1;
  height: 100%;
}

.theme-picker-name {
  flex: 1;
  text-align: left;
}

.theme-picker-check {
  font-size: 12px;
  color: @text-tertiary;
  opacity: 0;
  margin-left: 4px;
}

.el-dropdown-menu__item.is-current {
  font-weight: 500;

  .theme-picker-check {
    opacity: 1;
    color: @text-primary;
  }
}

@media (max-width: 1100px) {
  .header-wrapper .header-area .button-group .header-cta {
    width: 36px;
    padding: 0;
    gap: 0;

    .header-cta-label {
      display: none;
    }
  }
}

@media (max-width: 960px) {
  .header-wrapper {
    top: 8px;
    left: 8px;
    right: 8px;

    .header-area {
      padding: 0 6px 0 8px;

      .header-sidebar-toggle {
        width: @header-hit;
        height: @header-hit;
      }

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

        .header-cta {
          width: 32px;
          height: 32px;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
