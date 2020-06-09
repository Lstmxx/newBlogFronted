<template>
  <div class="article-digest" @click="selectArticle(articleData)">
    <div class="image-warp">
      <div class="image" :style="{ 'background-image': `url(${imagePath})` }"></div>
    </div>
    <div class="content">
      <div class="title">
        <span style="cursor: pointer;">{{articleData.name}}</span>
        <div class="tag-content">
          <svg-icon iconClass="bookmark" style="height: 16px;width: 16px;margin-top: 6px;color: #44a5e9"></svg-icon>
          <span :class="`tag ${articleData.tagColor}`" >{{articleData.tag}}</span>
        </div>
      </div>
      <p class="describe">{{articleData.description}}</p>
      <div class="footer">
        <div class="statistics">
          <svg-icon iconClass="watch" style="height: 16px;width: 16px;"></svg-icon>
          <span>{{articleData.watch}}</span>
          <!-- <svg-icon iconClass="thumb-up-line" style="height: 16px;width: 16px;"></svg-icon>
          <span>{{articleData.like}}</span> -->
        </div>
        <span class="time">{{articleData.createTime}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ArticleDigest',
  props: {
    articleData: {
      default: () => {},
      type: Object
    }
  },
  computed: {
    imagePath () {
      return this.articleData ? this.articleData['avatarImage'] : 'https://b-gold-cdn.xitu.io/v3/static/img/frontend.1dae74a.png'
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
@import './article-digest.less';
</style>
