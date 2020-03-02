<template>
  <div class="menu">
    <ul class="menu-list">
      <li
      :class="{ 'menu-item': true, 'selected': index === selectIndex }"
      v-for="(menuItem, index) in menuList"
      :key="index"
      @click="selectMenuItem(index, menuItem)">
        <span>{{menuItem.name}}</span>
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
