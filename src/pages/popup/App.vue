<script setup lang="ts">
import { ref } from 'vue'
import Tools from './components/Tools.vue'
import WinBridge from './components/WinBridge/index.vue'
import PageInfo from '@/components/PageInfo.vue'

const activeName = ref('first')

const handleClick = (tab: any, event: Event) => {
  console.log(tab, event)
}

const handleOpenHomePage = async () => {
  const pluginInfo = await chrome.management.getSelf()
  chrome.tabs.create({ url: `chrome-extension://${pluginInfo.id}/pages/index/index.html` })
}

</script>

<template>
  <div class="layout">
    <div class="home-btn" @click="handleOpenHomePage">主页</div>
    <el-tabs
      v-model="activeName"
      type="card"
      class="demo-tabs"
      @tab-click="handleClick"
    >
      <el-tab-pane label="Tools" name="first" class="tab-panel">
        <Tools />
      </el-tab-pane>
      <el-tab-pane label="WinBridge" name="second" class="tab-panel">
        <WinBridge />
      </el-tab-pane>
      <el-tab-pane label="PageInfo" name="third" class="tab-panel">
        <PageInfo />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="less" scoped>
.layout {
  position: relative;
  width: 600px;
  height: 600px;
  background-color: #242424;
  .tab-panel {
    height: 545px;
  }
  .home-btn {
    position: absolute;
    top: 8px;
    right: 16px;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    border: 1px solid #f5f5f5;
    border-radius: 4px;
    font-size: 14px;
    color: #fff;
    font-weight: 600;
    overflow: hidden;
    cursor: pointer;
    transition: all .3s;
    z-index: 1;
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 100%;
      content: '';
      background-color: #fff;
      transition: all .3s;
      z-index: -1;
    }
    &:hover {
      color: #242424;
      &::after {
        width: 100%;
      }
    }
  }
}
</style>
