<template>
  <div class="loading">
    <span>{{ context }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Loading',
  props: {
    context: {
      default: '加载中',
      type: String
    }
  },
  data () {
    return {
      
    }
  }
}
</script>

<style lang="less" scoped>
@import './loading.less';
</style>
