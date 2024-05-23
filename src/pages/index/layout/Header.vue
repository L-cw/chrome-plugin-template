<script lang="ts" setup>
import { ref } from 'vue'

</script>

<template>
  <header class="header">
    <div class="content header-cont">
      <div class="link-list">
        <router-link class="header-item" to="/">首页</router-link>
        <router-link class="header-item" to="/tools">工具</router-link>
      </div>
      <div class="light-flow-text logo" data-text="FE开发者工具">FE开发者工具</div>
    </div>
  </header>
</template>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 48px;
  background-image: radial-gradient(transparent 1px, #141414 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
  z-index: 1000;
  box-shadow: 0 0 10px 0 rgba(1, 1, 1, .1);
  .header-cont {
    display: flex;
    justify-content: space-between;
  }
  .link-list {
    display: flex;
  }
  .header-item {
    position: relative;
    display: block;
    height: 100%;
    line-height: 48px;
    padding: 0 16px;
    color: #fff;
    cursor: pointer;
    &.router-link-active {
      &::after {
        position: absolute;
        bottom: 0;
        left: 50%;
        content: '';
        width:0;
        height: 0;
        line-height: 0;
        font-size: 0;
        border-right: 10px solid transparent;
        border-bottom: 10px solid #242424;
        border-left: 10px solid transparent;
        transform: translate3d(-50%, 0, 0);
      }
    }
  }
}
.light-flow-text {
  position: relative;
  margin: auto 0;
  font-size: 14px;
  word-spacing: 0.2em;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  color: transparent;
  background-color: #E8A95B;
  -webkit-background-clip: text;
}

.light-flow-text::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-image: linear-gradient(120deg, transparent 0%, transparent 17px, white 30px, transparent 28px, transparent 42px, rgba(255, 255, 255, 0.3) 56px, transparent 70px, transparent 78px, rgba(255, 255, 255, 0.6) 90px, white 95px, rgba(255, 255, 255, 0.3) 100px, transparent 110px, transparent 120px, rgba(255, 255, 255, 0.3) 130px, transparent 140px, transparent 100%);
  -webkit-background-clip: text;
  background-size: 150% 100%;
  background-repeat: no-repeat;
  animation: shine 3s infinite linear;
}

@keyframes shine {
  0% {
      background-position: 50% 0;
  }
  100% {
      background-position: -190% 0;
  }
}
</style>
