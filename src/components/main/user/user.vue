<template>
  <div class="user">
    <div class="user-image" :style="{ 'background-image': `url(${imagePath})` }"></div>
    <div :class="{'name':true, selected: selectOption, notSelected: !selectOption}">
      <span class="user-name">{{userName}}</span>
      <div
      :class="{ 'user-option-list': true, 'show-option-list': selectOption }"
      @mouseenter="selectOption = true"
      @mouseleave="selectOption = false"
      >
        <ul>
          <li
          v-for="(option, index) in optionList" :key="index"
          @click="toOptionPage(option.path)"
          >
            <div>
              <svg-icon :iconClass="option.icon"></svg-icon>
              <span>{{option.name}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'User',
  computed: {
    ...mapGetters({
      userName: 'getUserName'
    })
  },
  data () {
    return {
      selectOption: false,
      imagePath: 'https://b-gold-cdn.xitu.io/v3/static/img/frontend.1dae74a.png',
      optionList: [
        {
          name: '写文章',
          path: 'write-article',
          icon: 'write'
        },
        {
          name: '我的主页',
          path: '',
          icon: 'user'
        },
        {
          name: '提醒',
          path: '',
          icon: 'notice'
        },
        {
          name: '登出',
          path: '',
          icon: 'logout'
        }
      ]
    }
  },
  methods: {
    ...mapActions([
      'logout'
    ]),
    toOptionPage (path) {
      console.log(path)
      if (path) {
        (this as any).$router.push({
          name: path
        })
      } else {
        (this as any).logout()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './user.less';
</style>
