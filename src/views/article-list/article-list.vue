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
import { getList } from '@/libs/request'
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
        { id: 3 }, { id: 4 }
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
        url: '/article/list'
      }
      getList(config).then((responseData) => {
        console.log(responseData)
      }).catch((err) => {
        console.log(err)
      })
    },
    selectArticle (id: number) : void {
      this['$router'].push({
        name: 'articleDetail',
        query: {
          id: String(id)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './article-list.less';
</style>
