<script setup lang="ts">
  import LayoutHeader from './layout/Header.vue'
  import LayoutFooter from './layout/Footer.vue'
</script>

<template>
  <div class="layout">
    <LayoutHeader />
    <div class="content main-cont">
      <router-view></router-view>
    </div>
    <LayoutFooter />
  </div>
</template>

<style lang="less" scoped>
.layout {
  padding-top: 48px;
  .main-cont {
    min-height: calc(100vh - 72px);
  }
}
</style>
