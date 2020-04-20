<template>
  <div class="menu">
    <ul class="menu-list">
      <li
      :class="{ 'menu-item': true, 'selected': index === selectIndex }"
      v-for="(menuItem, index) in menuList"
      :key="index"
      @click="selectMenuItem(index, menuItem)">
        <span>{{menuMap[menuItem.name]}}</span>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Menu',
  props: {
    menuList: {
      default: () => [],
      type: Array
    },
    selectIndex: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      menuMap: {
        charge: '电池',
        menu: '菜单',
        index: '首页',
        selector: '选择器'
      }
    }
  },
  methods: {
    selectMenuItem (index, item) {
      (this as any).$emit('on-select', index, item)
    }
  }
}
</script>
<style lang="less" scoped>
@import './menu.less';
</style>
