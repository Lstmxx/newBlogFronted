<template>
  <div class="main">
    <div class="left">
      <MySelf @turn-to-page="handleTurnToPage" :selectedPage="selectedPage" :scroll="scroll" />
    </div>
    <div class="content">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <div class="right">
      <div class="login" v-if="!showUser">
        <span :class="{selected: loginShow, notSelected: !loginShow}" @click.stop="loginShow = true">Login</span>
      </div>
      <div class="login-success" v-else>
        <User @to-option="toOption"></User>
        <div class="commit"></div>
      </div>
    </div>
    <Login v-if="loginShow" v-model="loginShow" @on-login-success="loginSuccess"></Login>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import MySelf from '@/views/my-self/index'
import Login from '@/components/main/login/index'
import User from '@/components/main/user/index'
export default Vue.extend({
  name: 'Main',
  props: {
    msg: String
  },
  components: {
    MySelf,
    Login,
    User
  },
  data () {
    return {
      scroll: 0,
      selectedPage: 'notice',
      loginShow: false,
      showUser: false
    }
  },
  methods: {
    toOption () {},
    loginSuccess () {
      (this as any).loginShow = false;
      (this as any).showUser = true
      // (this as any).loginShow = false
    },
    menu () {
      (this as any).scroll = document.getElementsByClassName('main')[0].scrollTop
    },
    handleTurnToPage (name: string) : void {
      if (this['$route'].path !== `/${name}`) {
        this.selectedPage = name
        this['$router'].push({
          name: name
        })
      }
    }
  },
  mounted () {
    if (localStorage.getItem('userName')) {
      (this as any).loginSuccess()
    }
    window.addEventListener('scroll', (this as any).menu, true)
  }
})
</script>
<style scoped lang="less">
@import './main.less';
</style>
