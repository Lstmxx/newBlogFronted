<template>
  <div class="add-article">
    <mavon-editor v-model="content"></mavon-editor>
  </div>
</template>

<script>
export default {
  name: 'AddArticle',
  data () {
    return {
      content: '',
    }
  }
}
</script>

<style lang="less" scoped>
@import './add-article.less';
</style>