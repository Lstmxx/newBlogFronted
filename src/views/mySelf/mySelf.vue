<template>
  <div class="mySelf">
    <div class="title">
      <blogHead></blogHead>
    </div>
    <ul class="list">
      <li v-for="(data, index) in listData" :key="index" @click="selectPage(data.name)">{{data.title}}</li>
    </ul>
  </div>
</template>
<script lang="ts">
import blogHead from '../../components/head/index'
export default {
  name: 'mySelf',
  components: {
    blogHead
  },
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
        { title: '关于作者', name: 'about' }
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
