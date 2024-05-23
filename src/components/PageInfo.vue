<script lang="ts" setup>
import { ref, defineProps, computed } from 'vue'
import qs from 'qs'

const remarkMap: any = {
  versionCode: '版本号'
}

const props = defineProps({
  url: {
    type: String,
    default: ''
  }
})
const tabUrl = ref('')
const paramsList: any = ref([])
const showError = ref(false)

const url = computed(() => {
  return props.url || tabUrl.value
})

const getTabUrl = async () => {
  let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  tabUrl.value = tab.url ? decodeURIComponent(tab.url) : ''
  getUrlParams()
}

const getUrlParams = () => {
  console.log('执行 URL 解析')
  try {
    const urlObj = new URL(url.value)
    let serachParamsStr = ''
    let hashParamsStr = ''
    if (urlObj.search) {
      serachParamsStr = urlObj.search[0] === '?' ? urlObj.search.slice(1) : urlObj.search
    }
    if (urlObj.hash) {
      const temp = urlObj.hash.match(/\?.*/g)
      console.log(temp)
      if (temp) {
        hashParamsStr = temp[0].slice(1)
        console.log(hashParamsStr)
      }
    }
    const params = { ...qs.parse(serachParamsStr), ...qs.parse(hashParamsStr) }
    paramsList.value = Object.keys(params).map((key, index) => {
      let val: any = params[key]
      if (key === 'commonData' || key === 'standardData') {
        val = JSON.parse(val)
      }
      if (typeof val === 'string') {
        return {
          id: index + '',
          key: key,
          value: val,
          remark: remarkMap[key] || '--'
        }
      } else {
        const children = Object.keys(val).map((item, itemIndex) => {
          return {
            id: index + '' + itemIndex,
            key: item,
            value: typeof val[item] === 'string' ? val[item] : JSON.stringify(val[item]),
            remark: remarkMap[key][item] || '--'
          }
        })
        return {
          key: key,
          value: JSON.stringify(val),
          remark: '--',
          children
        }
      }
    })
    showError.value = false
  } catch (error) {
    showError.value = true
    console.log(error)
  }
}

if (props.url) {
  getUrlParams()
} else {
  getTabUrl()
}
</script>

<template>
  <section class="popup-item-page">
    <div class="cur-link">解析URL： {{ url }}</div>
    <el-button class="parse-btn" type="primary" @click="getUrlParams">解析</el-button>
    <div v-show="showError">解析出错，请重试！</div>
    <el-table v-show="!showError" :data="paramsList" row-key="id" default-expand-all>
      <el-table-column label="字段" prop="key"></el-table-column>
      <el-table-column label="值" prop="value" show-overflow-tooltip></el-table-column>
      <el-table-column label="释义" prop="remark" show-overflow-tooltip></el-table-column>
    </el-table>
  </section>
</template>

<style lang="less" scoped>
.cur-link {
  word-break: break-all;
  font-size: 12px;
  margin-bottom: 16px;
}
.parse-btn {
  margin-bottom: 16px;
}
</style>
