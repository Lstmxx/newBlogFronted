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
          name: '首页',
          routeName: 'index'
        },
        {
          name: '文章',
          routeName: 'article'
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
      (this as any).selectedIndex = index
      this['$emit']('turn-to-page', routeName)
    }
  },
  mounted () {
    const routePath = this['$route'].path.split('/')[1];
    (this as any).menuList.every((data, index) => {
      if (routePath === data.routeName) {
        (this as any).selectedIndex = index
        return false
      }
      return true
    })
  }
}
</script>
<style lang="less" scoped>
@import './menu.less';
</style>
