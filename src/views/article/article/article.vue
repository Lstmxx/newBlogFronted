<template>
  <div class="article">
    <div class="articleList">
      <ArticleDigest
      v-for="(articleData, index) in articleList"
      :key="index"
      :index="index"
      :articleData="articleData"
      @on-select="selectArticle"/>
      <div class="footer">
        <button @click="loadArticle">hello</button>
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
import { normalizeTimeDetail } from '@/libs/utility/time'
export default {
  name: 'Article',
  components: {
    ArticleDigest,
    HotArticle
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (from.name === 'write-article' && to.query.reload) {
        (vm as any).articleList = [];
        (vm as any).loadTagList()
      }
    })
  },
  mounted () {
    (this as any).articleList = [];
    (this as any).loadTagList()
  },
  data () {
    return {
      articleList: [],
      pageData: {
        page: 1,
        pageSize: 15
      },
      tagMap: new Map()
    }
  },
  methods: {
    loadTagList () : void {
      let config = {
        url: '/tag/list'
      }
      getList(config).then((responseData) => {
        console.log(responseData)
        responseData.tagList.forEach(data => {
          (this as any).tagMap.set(data.id, data.tag_name)
        });
        (this as any).loadArticle()
        // console.log(responseData)
      }).catch((err) => {
        console.log(err)
      })
    },
    loadArticle () : void {
      let config = {
        url: '/article/list',
        data: (this as any).pageData
      }
      getList(config).then((responseData) => {
        responseData.articleList = responseData.articleList || []
        responseData.articleList.forEach((data: any) => {
          const article = {
            createTime: normalizeTimeDetail(data.create_time),
            name: data.name,
            like: data.like_num || 0,
            watch: data.watch_num || 0,
            tag: (this as any).tagMap.get(data.tag_id),
            tagId: data.tag_id
          };
          (this as any).articleList.push(article)
        })
        if (responseData.articleList.length > 0) {
          (this as any).pageData.page += 1
        }
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
@import './article.less';
</style>
