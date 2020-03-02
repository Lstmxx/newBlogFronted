<template>
  <div class="article-digest" @click="selectArticle">
    <div class="title">
      <span>hello</span>
    </div>
    <div class="describe">
      <span>nothello</span>
      <div class="image-warp">
        <div class="image" :style="{ 'background-image': `url(${imagePath})` }"></div>
      </div>
    </div>
    <div class="footer">
      <div class="statistics">
        <svg-icon iconClass="watch" style="color: #353535"></svg-icon>
        <span>4000</span>
        <svg-icon iconClass="thumb-up-line" style="color: #353535"></svg-icon>
        <span>3000</span>
      </div>
      <span>2019-04-03</span>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'ArticleDigest',
  props: {
    index: {
      default: 0,
      type: Number
    },
    articleData: {
      default: () => {},
      type: Object
    }
  },
  data () {
    return {
      imagePath: 'https://b-gold-cdn.xitu.io/v3/static/img/frontend.1dae74a.png'
    }
  },
  methods: {
    selectArticle () {
      let d = document.getElementsByClassName('articleDigest')
      console.log(d[this['index']]['offsetHeight'])
      this['$emit']('on-select', this['articleData'].id)
    }
  }
}
</script>
<style lang="less" scoped>
@import './article-digest.less';
</style>
