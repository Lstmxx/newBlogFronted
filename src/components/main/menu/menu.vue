<template>
  <div class="menu-list">
    <div
    class="menu-item"
    v-for="(data, index) in menuList"
    :key="index"
    @click="selectPage(data.routeName, index)"
    @tap="selectPage(data.routeName, index)">
      <span
      :class="{
        'selected': index === selectedIndex,
        'notSelected': index !== selectedIndex }"
      >
      {{data.name}}
      </span>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Menu',
  data () {
    return {
      selectedIndex: 0,
      menuList: [
        {
          name: '公告',
          routeName: 'notice'
        },
        {
          name: '文章',
          routeName: 'article-list'
        },
        {
          name: 'CSS-TRICK',
          routeName: 'css-trick'
        },
        {
          name: '关于',
          routeName: 'about'
        }
      ]
    }
  },
  methods: {
    selectPage (routeName: string, index: number) : void {
      console.log(routeName);
      (this as any).selectedIndex = index
      this['$emit']('turn-to-page', routeName)
    }
  },
  mounted () {
    const routeName = this['$route']['name'];
    (this as any).menuList.every((data, index) => {
      if (data.routeName === routeName) {
        (this as any).selectedIndex = index
        return false
      }
      return true
    })
    console.log(routeName)
  }
}
</script>
<style lang="less" scoped>
@import './menu.less';
</style>
