<template>
  <div class="article-detail">
    <div class="article-content">
      <h1>{{article.name}}</h1>
      <div v-highlight v-html="article.content">
      </div>
    </div>
    <Loading v-if="showLoding"></Loading>
  </div>
</template>
<script lang="ts">
import marked from 'marked'
import { getDetail } from '@/libs/request'
export default {
  name: 'ArticleDetail',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm['loadArticleDetail'](vm['$route']['query']['id'])
    })
  },
  data () {
    return {
      showLoding: false,
      article: {}
    }
  },
  methods: {
    loadArticleDetail (id) : void {
      (this as any).showLoding = true
      let config = {
        url: '/article/detail',
        data: {
          id
        }
      }
      getDetail(config).then((responseData) => {
        const article = responseData.article
        article.content = marked(article['content']);
        (this as any).article = article;
        (this as any).showLoding = false
        console.log(responseData)
      }).catch((err) => {
        (this as any).showLoding = false
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './article-detail.less';
</style>
