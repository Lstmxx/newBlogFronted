<template>
  <div class="mySelf">
    <div class="title">
      hello My Blog
    </div>
    <ul class="list">
      <li v-for="(data, index) in listData" :key="index" @click="selectPage(data.name)">{{data.title}}</li>
    </ul>
  </div>
</template>
<script lang="ts">
export default {
  name: 'mySelf',
  props: {
    selectedPage: {
      type: String,
      default: 'notice'
    }
  },
  data () {
    return {
      listData: [
        { title: '公告', name: 'notice' },
        { title: '文章列表', name: 'article' },
        { title: '关于我们', name: 'about' }
      ]
    }
  },
  methods: {
    selectPage (name: String) : void {
      this['$emit']('turn-to-page', name)
    }
  },
  mounted () {
    this['selectPage']('notice')
  }
}
</script>

<style lang="less" scoped>
@import './mySelf.less';
</style>
