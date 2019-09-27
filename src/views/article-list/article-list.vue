<template>
  <div class="articleList">
    <ArticleDigest v-for="(articleData, index) in articleDataList" :key="index" :index="index" :articleData="articleData"></ArticleDigest>
    <div class="footer">
      <button @click="loadMoreArticle">hello</button>
    </div>
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
      originArticleDataList: [
        {}, {}, {}, {}
      ],
      articleDataList: [
        {}, {}
      ]
    }
  },
  methods: {
    loadMoreArticle () : void {
      this['articleDataList'].push(...this['originArticleDataList'])
    }
  }
}
</script>

<style lang="less" scoped>
@import './article-list.less';
</style>
