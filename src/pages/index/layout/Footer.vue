<script lang="ts" setup>
import { ref } from 'vue'

const url = ref('')

</script>

<template>
  <section class="footer">
    <div class="content footer-cont">FE Dev Tools</div>
  </section>
</template>

<style lang="less" scoped>
.footer {
  height: 24px;
  background-color: #333;
  .footer-cont {
    line-height: 24px;
    text-align: center;
    color: #999;
  }
}
</style>
