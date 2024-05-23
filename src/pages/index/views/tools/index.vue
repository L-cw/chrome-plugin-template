<script lang="ts" setup>
import { ref } from 'vue'

const tools = [
  {
    title: 'URL 参数解析',
    desc: '',
    route: '/tools/parse-url'
  }
]

</script>

<template>
  <section class="tools-page">
    <router-link
      class="tools-item"
      v-for="(item, index) in tools"
      :key="index"
      :to="item.route"
    >
      <h2 class="tools-title">{{ item.title }}</h2>
      <p class="tools-desc">{{ item.desc }}</p>
    </router-link>
  </section>
</template>

<style lang="less" scoped>
.tools-page {
  padding: 16px 0 16px 20px;
  display: flex;
  flex-wrap: wrap;
  .tools-item {
    width: 400px;
    height: 100px;
    padding: 10px 16px;
    margin: 0 20px 20px 0;
    border-radius: 4px;
    cursor: pointer;
    background-color: #2c2e2f;
    transition: all .3s;
    .tools-title {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
    }
    &:hover {
      transform: translate3d(0, -2px, 0);
      .tools-title {
        color: #f0f0f0;
      }
    }
  }
}
</style>
