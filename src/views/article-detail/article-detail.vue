<template>
  <div class="articleDetail">
  </div>
</template>
<script lang="ts">
import { getDetail } from '@/libs/request'
export default {
  name: 'ArticleDetail',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log(vm['$route'])
      vm['loadArticleDetail'](vm['$route']['query']['id'])
    })
  },
  data () {
    return {
    }
  },
  methods: {
    loadArticleDetail (id) : void {
      let config = {
        url: '/article/detail',
        data: {
          id
        }
      }
      getDetail(config).then((responseData) => {
        console.log(responseData)
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './article-detail.less';
</style>
