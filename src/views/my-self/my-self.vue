<template>
  <div class="mySelf" :style="{ 'margin-top': scroll + 'px' }">
    <div class="title">
      <blogHead></blogHead>
    </div>
    <ul class="list">
      <li v-for="(data, index) in listData" :key="index" @click="selectPage(data.name, index)">
        <span :class="{'selected': index === selectedIndex, 'notSelected': index !== selectedIndex}">{{data.title}}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import blogHead from '../../components/website-title/index'
export default {
  name: 'MySelf',
  components: {
    blogHead
  },
  props: {
    selectedPage: {
      type: String,
      default: 'notice'
    },
    scroll: {
      type: Number,
      default: 0
    }
  },
  watch: {
  },
  data () {
    return {
      listData: [
        { title: '公告', name: 'notice' },
        { title: '文章列表', name: 'articleList' },
        { title: '关于作者', name: 'about' }
      ],
      selectedIndex: 0
    }
  },
  methods: {
    selectPage (name: string, index: number) : void {
      this['selectedIndex'] = index
      this['$emit']('turn-to-page', name)
    }
  },
  mounted () {
    const name = this['$route']['name']
    if (name.startsWith('article')) {
      this['selectedIndex'] = 1
    } else if (name === 'about') {
      this['selectedIndex'] = 2
    } else {
      this['selectPage']('notice', 0)
    }
  }
}
</script>

<style lang="less" scoped>
@import './my-self.less';
</style>
