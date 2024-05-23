<script lang="ts" setup>
import { ref, computed } from 'vue'
import PageInfo from '@/components/PageInfo.vue'

const inputUrl = ref('')

const url = computed(() => {
  if (!inputUrl.value.startsWith('http')) {
    return `https://${inputUrl.value}`
  }
  return inputUrl.value
})

</script>

<template>
  <section class="tools-parse-url-page">
    <el-input v-model="inputUrl" type="textarea" class="url-input" :rows="8" resize="none" placeholder="可输入 URL" />
    <PageInfo :url="url" />
  </section>
</template>

<style lang="less" scoped>
.tools-parse-url-page {
  padding: 20px 0;
  .url-input {
    width: 100%;
    margin-bottom: 20px;
  }
}
</style>
