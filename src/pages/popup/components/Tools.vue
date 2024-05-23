<script lang="ts" setup>
import { ref, shallowRef, onMounted } from 'vue'
import qs from 'qs'
import { Codemirror } from 'vue-codemirror'
import { json } from '@codemirror/lang-json'
import { oneDark } from '@codemirror/theme-one-dark'

const shotcuts = [
  {
    label: 'tips',
    value: { __tips__: 1 }
  }
]

const url = ref('')
const urlObj: any = ref({})
const params = ref('{}')
const paramsObj = ref({})
const extensions = [json(), oneDark]
const view = shallowRef()
const errorTips = ref('')
const tabId = ref(0)
const parseSource = ref('search')

onMounted(() => {
  console.log('mounted')
})

const getTabUrl = async () => {
  let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  tabId.value = tab.id ? tab.id : 0
  if (tab.url) {
    url.value = decodeURIComponent(tab.url)
    try {
      urlObj.value = new URL(url.value)
      handleParse()
      errorTips.value = ''
    } catch (error) {
      errorTips.value = 'URL 参数解析失败'
      console.log(error)
    }
  }
}
const handleParse = () => {
  let paramsStr = ''
  if (parseSource.value === 'hash') {
    paramsStr = urlObj.value.hash.match(/\?.*/g) ? urlObj.value.hash.split('?')[1] : ''
  } else {
    paramsStr = urlObj.value.search[0] === '?' ? urlObj.value.search.slice(1) : ''
  }
  paramsObj.value = qs.parse(paramsStr)
  setInputVal()
}

const handleReady = (payload: any) => {
  view.value = payload.view
}
const log = (msg: string, e: any) => {
  console.log(msg)
}


const handleClickShotcut = (item: any) => {
  paramsObj.value = { ...paramsObj.value, ...item.value }
  setInputVal()
}

const setInputVal = () => {
  params.value = JSON.stringify(paramsObj.value, null, '\t')
}

const handleChange = () => {
  try {
    const urlObj = JSON.parse(params.value)
    console.log(qs.stringify(urlObj))
    const urlTemp = new URL(url.value)
    if (parseSource.value === 'hash') {
      const tmpArr = urlTemp.hash.split('?')
      tmpArr[1] = qs.stringify(urlObj)
      urlTemp.hash = tmpArr.join('?')
    } else {
      urlTemp.search = '?' + qs.stringify(urlObj)
    }
    console.log(urlTemp.toString())
    chrome.tabs.update({ url: urlTemp.toString(), openerTabId: tabId.value })
    setTimeout(() => {
      chrome.tabs.reload(tabId.value)
    }, 100)
    errorTips.value = ''
  } catch (error) {
    errorTips.value = '输入不合法，请检查输入'
    console.log(error)
  }
}

getTabUrl()
</script>

<template>
  <section class="popup-item-page">
    <div class="cur-link">页面URL： {{ url }}</div>
    <ul>
      <li class="tool-item">
        <div class="title">编辑URL</div>
        <el-radio-group v-model="parseSource" size="small" @change="handleParse">
          <el-radio-button label="search">Search</el-radio-button>
          <el-radio-button label="hash">Hash</el-radio-button>
        </el-radio-group>
        <div class="shotcuts-list">快速添加：
          <el-button
            v-for="(item, index) in shotcuts"
            :key="index"
            type="primary"
            size="small"
            text
            @click="handleClickShotcut(item)"
          >{{ item.label }}</el-button>
        </div>
        <codemirror
          v-model="params"
          placeholder="Code goes here..."
          :style="{ height: '200px' }"
          :autofocus="true"
          :indent-with-tab="true"
          :tab-size="2"
          :extensions="extensions"
          @ready="handleReady"
          @change="log('change', $event)"
          @focus="log('focus', $event)"
          @blur="log('blur', $event)"
        />
        <div>
          <el-button class="change-btn" type="primary" @click="handleChange">Change</el-button>
          <p class="error-tips">{{ errorTips }}</p>
        </div>
      </li>
    </ul>
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
  margin-bottom: 16px;
}
.tool-item {
  margin-bottom: 16px;
  .shotcuts-list {
    font-size: 12px;
  }
}
.title {
  position: relative;
  padding: 0 16px;
  font-size: 16px;
  &:before {
    position: absolute;
    content: '';
    background-color: #409EFF;
    width: 3px;
    height: 10px;
    top: 50%;
    left: 0;
    transform: translate3d(0, -50%, 0);
  }
}
.change-btn {
  margin-top: 10px;
}
.error-tips {
  color: #f00;
  margin-left: 16px;
}
</style>
