<template>
  <div class="hot-article-digest" @click="selectArticle(hotArticleData)">
    <div class="image-warp">
      <div class="image" :style="{ 'background-image': `url(${imagePath})` }"></div>
      <div class="tag-content">
        <!-- <svg-icon iconClass="bookmark" style="height: 16px;width: 16px;margin-top: 6px;color: #44a5e9"></svg-icon> -->
        <span :class="`tag ${hotArticleData.tagColor}`" >{{hotArticleData.tag}}</span>
      </div>
    </div>
    <div class="title">
      <span style="cursor: pointer;">{{hotArticleData.name}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HotArticleDigest',
  props: {
    hotArticleData: {
      default: () => {},
      type: Object
    }
  },
  computed: {
    imagePath () {
      return this.hotArticleData ? this.hotArticleData['avatarImage'] : 'https://b-gold-cdn.xitu.io/v3/static/img/frontend.1dae74a.png'
    }
  },
  methods: {
    selectArticle (data) {
      this.$emit('on-select', data.id)
    }
  }
}
</script>
<style lang="less" scoped>
@import './hot-article-digest.less';
</style>
