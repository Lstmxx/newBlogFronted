<template>
  <div class="article">
    <div class="articleList">
      <ArticleDigest
      v-for="(articleData, index) in articleDataList"
      :key="index"
      :index="index"
      :articleData="articleData"
      @on-select="selectArticle"/>
      <div class="footer">
        <button @click="loadMoreArticle">hello</button>
      </div>
    </div>
    <div class="border" style="position: sticky;top: 103px;"></div>
    <div class="hot-list">
      <span class="title">近期热门</span>
      <HotArticle />
    </div>
  </div>
</template>
<script lang="ts">
import ArticleDigest from '@/components/article/article-digest/index'
import HotArticle from '@/components/article/hot-article/index'
import { getList } from '@/libs/request'
export default {
  name: 'ArticleList',
  components: {
    ArticleDigest,
    HotArticle
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
        name: 'article-detail',
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
