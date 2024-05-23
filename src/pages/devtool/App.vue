<script setup lang="ts">
import { ref, computed } from 'vue'
import PageInfo from '@/components/PageInfo.vue'

const tabId = chrome.devtools.inspectedWindow.tabId
const tabUrl = ref('')
const inputUrl = ref('')

const url = computed(() => {
  if (inputUrl.value) {
    if (!inputUrl.value.startsWith('http')) {
      return `https://${inputUrl.value}`
    }
    return inputUrl.value
  }
  return tabUrl.value
})

const getUrl = async () => {
  const tab = await chrome.tabs.get(tabId)
  tabUrl.value = tab.url || ''
}

getUrl()
</script>

<template>
  <div class="layout">
    <div class="top-box">
      <div class="notice">我放弃了在 inspect 出的 devtools 中获取 URL</div>
      <el-input v-model="inputUrl" type="textarea" class="url-input" :rows="8" resize="none" placeholder="可输入 URL" />
    </div>
    <PageInfo :url="url" />
  </div>
</template>

<style lang="less" scoped>
.layout {
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #242424;
  padding-top: 20px;
  .top-box {
    padding: 0 16px;
    margin-bottom: 16px;
  }
  .notice {
    margin-bottom: 16px;
    font-size: 14px;
  }
}
</style>
