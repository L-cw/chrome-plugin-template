<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import FormItem from './FormItem.vue'

const funName = ref('StartRecord')
const status = ref(1)
const searchValue = ref('')
const actionList = reactive<any>([
  {
    name: 'CUSTOM_EVENT',
    desc: '自定义事件',
    params: [
      {
        name: 'data',
        formType: 'textarea',
        desc: '数据',
        value: JSON.stringify({
          name: '张三',
          age: 18
        })
      },
      {
        name: 'eventName',
        formType: 'input',
        desc: '事件名',
        value: ''
      },
    ]
  }
])

const filterActions = computed(() => {
  if (!searchValue.value) { return actionList }
  return actionList.filter((item: any) => {
    const itemName = item.name.toLowerCase()
    const searchVal = searchValue.value.toLowerCase()
    return itemName.includes(searchVal)
  })
})

async function handleInvokeAction(action: any) {
  console.log('action: ', action)
  let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true })
  const data: any = {}
  action.params.forEach((item: any) => {
    data[item.name] = item.value
  })
  let sendData = {
    type: 'fireEvent',
    eventName: action.name === 'CUSTOM_EVENT' ? data.eventName : action.name,
    targetOrigin: tab.url,
    data
  }
  console.log('sendData: ', sendData)
  chrome.tabs.sendMessage(tab.id || 0, sendData)
}


</script>

<template>
  <section class="action-list">
    <div class="action-item" v-for="(action, actionIndex) in filterActions" :key="actionIndex">
      <div class="action-bar">
        <span>{{ action.name }}</span>
        <span class="action-desc">{{ action.desc }}</span>
      </div>
      <FormItem
        v-for="(item, index) in action.params"
        :key="index"
        :formInfo="item"
        v-model="item.value"
      />
      <el-button class="send-btn" type="primary" @click="() => handleInvokeAction(action)">发送事件</el-button>
    </div>
    <div class="operate-bar">
      <el-input
        v-model="searchValue"
        clearable
        prefix-icon="Search"
        placeholder="输入内容自动搜索"
        size="small"
      />
    </div>
  </section>
</template>

<style lang="less" scoped>
.action-list {
  padding: 0 16px 56px;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
.action-item {
  display: flex;
  flex-wrap: wrap;
  padding: 4px 8px 0;
  border-radius: 4px;
  background-color: #3e3c3c;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
  .action-bar {
    width: 100%;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    margin-bottom: 8px;
    font-weight: bold;
    color: #fff;
    .action-desc {
      margin-left: 20px;
      font-size: 12px;
      font-weight: normal;
      color: #999;
    }
  }
  .send-btn {
    margin-bottom: 8px;
  }
}
.operate-bar {
  height: 40px;
  padding: 0 16px;
  background-color: #221e1e;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
}
</style>
