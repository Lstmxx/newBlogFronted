<template>
  <div class="my-self" :style="{ 'margin-top': scroll + 'px' }">
    hello
  </div>
</template>
<script lang="ts">
export default {
  name: 'MySelf',
  props: {
    scroll: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import './my-self.less';
</style>
