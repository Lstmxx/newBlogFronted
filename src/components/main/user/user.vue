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
      userName: 'getUserName',
      role: 'getRole'
    }),
    optionList () {
      const optionList = [
        {
          name: '写文章',
          path: 'article-write',
          icon: 'write'
        },
        {
          name: '写css',
          path: 'css-trick-write',
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
          icon: 'index'
        },
        {
          name: '登出',
          path: '',
          icon: 'logout'
        }
      ]
      return (this as any).role === 'superAdmin' ? optionList : optionList.slice(2)
    }
  },
  data () {
    return {
      selectOption: false,
      imagePath: 'https://b-gold-cdn.xitu.io/v3/static/img/frontend.1dae74a.png'
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
        (this as any).logout().then((responseData) => {
          (this as any).$router.push({
            name: 'article',
            query: {
              reload: true
            }
          })
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './user.less';
</style>
