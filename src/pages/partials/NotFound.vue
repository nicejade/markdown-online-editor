<!-- @format -->

<template>
  <div class="error-404">
    <div class="error-404-body">
      <div class="error-404-body-title">
        <span class="left-four">4</span>
        <span class="cener-zero">0</span>
        <span class="right-four">4</span>
      </div>
      <p class="error-404-body-message">YOU&nbsp;&nbsp;LOOK&nbsp;&nbsp;LOST</p>
      <div class="error-404-btns">
        <a href="javascript:;" @click="onGoHomeClick"> 返回首页 </a>
        <a href="javascript:;" @click="onBackPageClick">返回上一页</a>
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
    }
  }
}
</script>

<style type="text/css" lang="scss">
@keyframes error-404-animation {
  0% {
    transform: rotateZ(0deg);
  }
  20% {
    transform: rotateZ(60deg);
  }
  40% {
    transform: rotateZ(10deg);
  }
  60% {
    transform: rotateZ(-50deg);
  }
  80% {
    transform: rotateZ(20deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}

@keyframes left-four-animation {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(0);
  }
  40% {
    transform: translateX(0);
  }
  60% {
    transform: translateX(-50px);
  }
  80% {
    transform: translateX(-20px);
  }
  100% {
    transform: translateX(0);
  }
}
@keyframes right-four-animation {
  0% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(60px);
  }
  40% {
    transform: translateX(40px);
  }
  60% {
    transform: translateX(0px);
  }
  80% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
}
.error-404-body {
  width: 96%;
  max-width: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 20px 0;
  .error-404-body-title {
    text-align: center;
    font-size: 7rem;
    font-weight: 700;
    color: #2d8cf0;
    height: 13rem;
    line-height: 13rem;
    .cener-zero {
      display: inline-block;
      color: #19be6b;
      animation: error-404-animation 3s ease 0s infinite alternate;
      margin: 0 -1rem;
    }
    .left-four {
      margin: 0;
      display: inline-block;
      animation: left-four-animation 3s ease 0s infinite alternate;
    }
    .right-four {
      margin: 0;
      display: inline-block;
      animation: right-four-animation 3s ease 0s infinite alternate;
    }
    .zero-icon {
      width: 7rem;
      height: 7rem;
    }
  }
  .error-404-body-message {
    display: block;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 12px;
    color: #dddde2;
  }
}

@media (max-width: 375px) {
  .el-card__body {
    padding: 10px 0;
  }
  .error-404-body {
    .error-404-body-title {
      height: 12rem;
      font-size: 6rem;
    }
  }
}
</style>
