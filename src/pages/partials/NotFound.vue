<!-- @format -->

<template>
  <div class="error-404">
    <div class="error-404-body">
      <p class="error-404-eyebrow">Error</p>
      <div class="error-404-body-title">
        <span class="digit">4</span>
        <span class="digit digit--accent">0</span>
        <span class="digit">4</span>
      </div>
      <p class="error-404-body-message">页面不存在</p>
      <p class="error-404-body-sub">你访问的地址可能已移动或不可用。</p>
      <div class="error-404-btns">
        <a href="javascript:;" class="btn btn--primary" @click="onGoHomeClick">返回首页</a>
        <a href="javascript:;" class="btn btn--ghost" @click="onBackPageClick">返回上一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404',

  methods: {
    onBackPageClick() {
      this.$router.go(-1)
    },
    onGoHomeClick() {
      this.$router.push('/')
    },
  },
}
</script>

<style type="text/css" lang="less">
@import './../../assets/styles/style.less';

.error-404 {
  width: 100%;
  min-height: 100vh;
  background: @bg-page;
  position: relative;
}

.error-404-body {
  width: 92%;
  max-width: 480px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 40px 24px;
  background: @white;
  border-radius: @radius-xl;
  border: 1px solid @border-hairline;
  box-shadow: @shadow-md;

  .error-404-eyebrow {
    font-size: @font-micro;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: @text-tertiary;
    margin-bottom: 8px;
  }

  .error-404-body-title {
    text-align: center;
    font-size: 5.5rem;
    font-weight: 700;
    letter-spacing: -0.04em;
    color: @text-primary;
    line-height: 1.1;
    margin-bottom: 8px;

    .digit {
      display: inline-block;
    }

    .digit--accent {
      color: @brand;
      margin: 0 0.05em;
    }
  }

  .error-404-body-message {
    display: block;
    text-align: center;
    font-size: 21px;
    font-weight: 600;
    letter-spacing: -0.022em;
    color: @text-primary;
    margin-bottom: 8px;
  }

  .error-404-body-sub {
    font-size: 15px;
    color: @text-secondary;
    letter-spacing: -0.01em;
    margin-bottom: 28px;
  }

  .error-404-btns {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 10px 22px;
      border-radius: @radius-pill;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.01em;
      cursor: pointer;
      transition: background @duration-fast @ease-out, box-shadow @duration-fast @ease-out,
        transform @duration-fast @ease-out, border-color @duration-fast @ease-out;
      text-decoration: none;

      &--primary {
        background: @brand;
        color: @white;
        box-shadow: 0 1px 2px rgba(0, 113, 227, 0.28);

        &:hover {
          background: @brand-hover;
          color: @white;
        }
      }

      &--ghost {
        background: @white;
        color: @text-primary;
        border: 1px solid @border-grey;

        &:hover {
          border-color: rgba(0, 0, 0, 0.18);
          color: @text-primary;
          background: @bg-page;
        }
      }

      &:active {
        transform: scale(0.98);
      }
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .error-404-body .btn {
    transition: none;
  }
}
</style>
