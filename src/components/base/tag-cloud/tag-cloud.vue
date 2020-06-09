<template>
  <div class="tag-cloud" v-if="tagList.length > 0">
    <div class="tag" v-for="(tag, index) in tagList" :style="{ 'animation-duration': `${6 + Math.random() * 10}s` }" :key="index" >
      <div class="key" :data-content="tag" :style="{ 'margin-top': `${Math.random() * 20}px` }"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TagCloud',
  props: {
    tagList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
@import './tag-cloud.less';
</style>
