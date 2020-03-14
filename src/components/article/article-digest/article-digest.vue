<template>
  <div class="article-digest" @click="selectArticle">
    <div class="title">
      <span class="tag">{{articleData.tag}}</span>
      <span style="margin-left: 10px">{{articleData.name}}</span>
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
        <span>{{articleData.watch}}</span>
        <svg-icon iconClass="thumb-up-line" style="color: #353535"></svg-icon>
        <span>{{articleData.like}}</span>
      </div>
      <span>{{articleData.createTime}}</span>
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
    }
  }
}
</script>
<style lang="less" scoped>
@import './article-digest.less';
</style>
