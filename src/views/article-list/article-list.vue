<template>
  <div class="articleList">
    <ArticleDigest v-for="(articleData, index) in articleDataList" :key="index" :index="index" :articleData="articleData" @on-select="selectArticle"></ArticleDigest>
    <div class="footer">
      <button @click="loadMoreArticle">hello</button>
    </div>
  </div>
</template>
<script lang="ts">
import ArticleDigest from '@/components/article-digest/index'
import { sendRequest } from '@/libs/request.js'
export default {
  name: 'ArticleList',
  components: {
    ArticleDigest
  },
  mounted () {
    this['loadMoreArticle']()
  },
  data () {
    return {
      originArticleDataList: [
        {}, {}, {}, {}
      ],
      articleDataList: [
        {
          id: 1
        },
        {
          id: 2
        }
      ]
    }
  },
  methods: {
    loadMoreArticle () : void {
      this['articleDataList'].push(...this['originArticleDataList'])
      let config = {
        method: 'GET',
        url: '/load_article_list',
        data: {}
      }
      sendRequest(config).then((responseData) => {
        console.log(responseData)
      }).catch((err) => {
        console.log(err)
      })
    },
    selectArticle (id: number) : void {
      console.log('hello')
      this['$router'].push({
        name: 'articleDetail',
        query: { id }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './article-list.less';
</style>
