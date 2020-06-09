<template>
  <div class="index">
    <CssItem />
  </div>
</template>

<script>
import CssItem from '@/components/css-trick/css-item/index'
export default {
  name: 'CssTrickIndex',
  components: {
    CssItem
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      console.log(vm.$router.options.routes)
      const routeChildren = vm.$router.options.routes.find((data) => {
        if (data.name === '_css-trick') {
          return true
        }
      })
      vm.menuList = routeChildren.children[0].children
      if (vm.$route.name === 'css-trick') {
        vm.selectIndex = 0
      } else {
        vm.menuList.every((data, index) => {
          if (data.name === vm.$route.name) {
            vm.selectIndex = index
            return false
          }
          return true
        })
      }
    })
  },
  data () {
    return {
      menuList: [],
      selectIndex: 0
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
@import './index.less';
</style>
