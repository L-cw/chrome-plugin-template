<script setup lang="ts">
import { linkGroup } from '../constants/linkGroup'

</script>

<template>
  <div class="link-group">
    <div
      class="list-wrapper"
      v-for="(listWrapper, index) in linkGroup"
      :key="index"
    >
      <div class="title">{{ listWrapper.title }}</div>
      <div v-if="listWrapper.text" class="text-box">
        <div class="text" v-html="listWrapper.text"></div>
      </div>
      <ul class="list">
        <a
          class="list-item"
          v-for="(item, linkIndex) in listWrapper.list"
          :style="item.width ? { width: item.width } : {}"
          :key="linkIndex"
          target="_blank"
          :href="item.link"
        >
          <img v-if="item.icon" class="link-icon" :src="item.icon" alt="">
          <span v-else class="link-icon">{{ item.label.slice(0, 1) }}</span>
          <span class="link">{{ item.label }}</span>
        </a>
      </ul>
    </div>
  </div>
</template>

<style lang="less" scoped>
.link-group {
  padding: 16px 0;
  .list-wrapper {
    margin-bottom: 24px;
  }
  .title {
    position: relative;
    margin-bottom: 16px;
    padding-left: 16px;
    font-size: 16px;
    color: #fff;
    font-weight: 600;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate3d(0, -50%, 0);
      width: 3px;
      height: 10px;
      background-color: #fff;
    }
  }
  .text-box {
    padding: 0 10px;
    .text {
      width: 100%;
      max-height: 200px;
      padding: 10px;
      margin-bottom: 16px;
      font-size: 12px;
      line-height: 1.5;
      border-radius: 4px;
      overflow-x: hidden;
      overflow-y: auto;
      color: #fff;
      background-color: #2c2e2f;
    }
  }
  .list {
    padding-left: 10px;
  }
  .list-item {
    display: inline-flex;
    align-items: center;
    width: 244px;
    height: 48px;
    padding: 10px;
    margin: 0 10px 10px 0;
    border-radius: 4px;
    background-color: #2c2e2f;
    transition: all .3s;
    &:hover {
      transform: translate3d(0, -2px, 0);
    }
  }
  .link-icon {
    width: 24px;
    height: 24px;
    font-size: 12px;
    line-height: 24px;
    margin-right: 10px;
    border-radius: 24px;
    text-align: center;
    background-color: #242424;
  }
  .link {
    flex: 1;
    font-size: 14px;
    color: #fff;
  }
}
</style>
