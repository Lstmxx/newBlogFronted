<template>
  <div id="article-container" class="container">
    <div class="article">
      <div class="articleList">
        <ArticleDigest
        v-for="(articleData, index) in articleList"
        :key="index"
        :index="index"
        :articleData="articleData"
        @on-select="selectArticle"/>
        <div class="footer">
          <p v-if="nothing">已经没有更多啦~</p>
        </div>
      </div>
      <div class="hot-list">
        <span class="title">推荐文章</span>
        <HotArticleDigest
        v-for="(hotArticleData, index) in hotArticleList"
        :key="index"
        :hotArticleData="hotArticleData"
        @on-select="selectArticle"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import ArticleDigest from '@/components/article/article-digest/index'
import HotArticleDigest from '@/components/article/hot-article-digest/index'
import { getPage, getList } from '@/libs/request'
import { normalizeTimeDetail } from '@/libs/utility/time'
import { handleScroll } from '@/libs/utility/scroll'
export default {
  name: 'Article',
  components: {
    ArticleDigest,
    HotArticleDigest
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      if (from.name === 'write-article' && to.query.reload) {
        (vm as any).pageData = {
          page: 1,
          pageSize: 15
        };
        (vm as any).articleList = [];
        (vm as any).loadTagList()
      }
    })
  },
  mounted () {
    handleScroll('article-container', (this as any).handleScroll);
    (this as any).articleList = [];
    (this as any).loadTagList()
  },
  data () {
    return {
      articleList: [],
      hotArticleList: [],
      pageData: {
        page: 1,
        pageSize: 15
      },
      tagMap: new Map(),
      nothing: false
    }
  },
  methods: {
    handleScroll (event) : void {
      const scrollTop = event.target.scrollTop
      const clientHeight = event.target.clientHeight
      const scrollHeight = event.target.scrollHeight
      if (!(this as any).nothing && (scrollTop + clientHeight === scrollHeight)) {
        (this as any).loadArticle()
      }
    },
    loadTagList () : void {
      (this as any).$Loading.show()
      const config = {
        url: '/tag'
      }
      getList(config).then((responseData) => {
        responseData.tagList.forEach(data => {
          (this as any).tagMap.set(data.id, data)
        });
        (this as any).loadHotArticle();
        (this as any).loadArticle()
      }).catch((err) => {
        console.log(err)
      })
    },
    loadHotArticle () : void {
      const config = {
        url: '/article/hot'
      }
      getList(config).then((responseData) => {
        (this as any).hotArticleList = []
        responseData.articleList = responseData.articleList || []
        responseData.articleList.forEach(data => {
          const article = {
            id: data.id,
            createTime: normalizeTimeDetail(data.create_time),
            name: data.name,
            tag: (this as any).tagMap.get(data.tag_id).tag_name,
            tagId: data.tag_id,
            avatarImage: data.avatar_image,
            tagColor: (this as any).tagMap.get(data.tag_id).tag_color
          };
          (this as any).hotArticleList.push(article)
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    loadArticle () : void {
      const config = {
        url: '/article',
        data: (this as any).pageData
      }
      getPage(config).then((responseData) => {
        (this as any).$Loading.hide()
        responseData.articleList = responseData.articleList || []
        responseData.articleList.forEach((data: any) => {
          const article = {
            id: data.id,
            createTime: normalizeTimeDetail(data.create_time),
            name: data.name,
            like: data.like_num || 0,
            watch: data.watch_num || 0,
            tag: (this as any).tagMap.get(data.tag_id).tag_name,
            tagId: data.tag_id,
            avatarImage: data.avatar_image,
            tagColor: (this as any).tagMap.get(data.tag_id).tag_color,
            description: data.description
          };
          (this as any).articleList.push(article)
        })
        if (responseData.articleList.length > 0) {
          (this as any).pageData.page += 1
        } else {
          (this as any).nothing = true
        }
      }).catch((err) => {
        (this as any).$Loading.hide()
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
