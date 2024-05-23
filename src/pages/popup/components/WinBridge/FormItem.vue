<script lang="ts" setup>
import { ref, computed } from 'vue'

const emitEventHanlder = defineEmits(['update:modelValue'])

// 1. 定义props
type FormType = 'input' | 'textarea' | 'select' | 'input-number' | ''
interface FormInfo {
  name: string,
  desc?: string,
  formType: FormType,
  value: any,
  options?: any[]
}
const props = defineProps<{
  formInfo: FormInfo
}>()

const value = computed({
  get() {
    return props.formInfo.value
  },
  set(value) {
    emitEventHanlder('update:modelValue', value)
  }
})

</script>

<template>
  <el-input-number
    v-if="props.formInfo.formType === 'input-number'"
    class="form-unit input-word"
    v-model="value"
    :placeholder="props.formInfo.desc"
  />
  <el-input
    v-else-if="props.formInfo.formType === 'textarea'"
    class="form-unit input-area"
    type="textarea"
    v-model="value"
    :placeholder="props.formInfo.desc"
  ></el-input>
  <el-select
    v-else-if="props.formInfo.formType === 'select'"
    class="form-unit input-select"
    v-model="value"
    :placeholder="props.formInfo.desc"
  >
    <el-option
      v-for="item in props.formInfo.options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <el-input
    v-else
    class="form-unit input-word"
    v-model="value"
    :placeholder="props.formInfo.desc"
  ></el-input>
</template>

<style lang="less" scoped>
.form-unit {
  margin-bottom: 8px;
}
.input-word {
  width: 120px;
  margin-right: 16px;
}
.input-area {
  width: 100%;
  margin-right: 16px;
}
.input-select {
  width: 160px;
  margin-right: 16px;
}
</style>
