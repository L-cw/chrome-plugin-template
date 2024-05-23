<script lang="ts" setup>
import { ref } from 'vue'
import qs from 'qs'
import { json } from 'stream/consumers';
import PageInfo from '@/components/PageInfo.vue'

const url = ref('')
const paramsList: any = ref([])

const getTabUrl = async () => {
  let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  url.value = tab.url ? decodeURIComponent(tab.url) : ''
}

getTabUrl()
</script>

<template>
  <section class="popup-item-page">
    <PageInfo :url="url" />
  </section>
</template>

<style lang="less" scoped>
.popup-item-page {
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.cur-link {
  word-break: break-all;
  font-size: 12px;
}
</style>
