<template>
  <div class="articleList">
    <ArticleDigest v-for="(articleData, index) in articleDataList" :key="index" :index="index" :articleData="articleData"></ArticleDigest>
  </div>
</template>
<script lang="ts">
import ArticleDigest from '@/components/article-digest/index'
export default {
  name: 'ArticleList',
  components: {
    ArticleDigest
  },
  data () {
    return {
      articleDataList: [
        {}, {}
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import './article-list.less';
</style>
