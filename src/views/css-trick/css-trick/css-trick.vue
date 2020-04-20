<template>
  <div class="css-trick">
    <Menu
    :menuList="menuList"
    :selectIndex="selectIndex"
    @on-select="selectRouteItem" />
    <div class="content">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/css-trick/menu/index'
export default {
  name: 'CssTrick',
  components: {
    Menu
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      const routeChildren = vm.$router.options.routes.find((data) => {
        if (data.name === 'CSS-TRICK') {
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
    selectRouteItem (index) {
      if (index !== this.selectIndex) {
        this.selectIndex = index
        this.$router.push({
          name: this.menuList[index].name
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './css-trick.less';
</style>
