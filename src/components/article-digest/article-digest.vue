<template>
  <div class="articleDigest" @click="selectArticle">
    <div class="articleTitle">
      <span>hello</span>
    </div>
    <div class="contentWarp">
      <div class="imageWarp">
        <div class="image"></div>
      </div>
      <div class="content">
        <div class="summary">
          <span>nothello</span>
        </div>
        <div class="footer">
          <div class="pubilshTime">
            <span>发布日期：</span>
            <span>修改日期：</span>
          </div>
          <div class="readingTimes">
            <span>1130</span>
          </div>
        </div>
      </div>
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
    }
  },
  data () {
    return {
    }
  },
  methods: {
    selectArticle () {
      let d = document.getElementsByClassName('articleDigest')
      console.log(d[this['index']]['offsetHeight'])
    }
  }
}
</script>
<style lang="less" scoped>
@import './article-digest.less';
</style>
