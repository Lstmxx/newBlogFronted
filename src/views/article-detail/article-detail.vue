<template>
  <div class="articleDetail">
  </div>
</template>
<script lang="ts">
export default {
  name: 'ArticleDetail',
  mounted () {
    console.log(this['$route'])
  },
  data () {
    return {
    }
  },
  methods: {
    loadArticleDetail () : void {
    }
  }
}
</script>

<style lang="less" scoped>
@import './article-detail.less';
</style>
