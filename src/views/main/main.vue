/* eslint-disable */
<template>
  <div class="main">
    <div class="title">
      <div class="logo-menu">
        <Logo></Logo>
        <Menu @turn-to-page="handleTurnToPage"></Menu>
      </div>
      <div class="login" v-if="!token">
        <span :class="{selected: loginShow, notSelected: !loginShow}" @click.stop="loginShow = true">Login</span>
      </div>
      <div class="login-success" v-else>
        <User style="z-index: 3"></User>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive">
      </router-view>
    </div>
    <Login v-if="loginShow" v-model="loginShow" @on-login-success="loginSuccess"></Login>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Login from '@/components/main/login/index'
import User from '@/components/main/user/index'
import Menu from '@/components/main/menu/index'
import Logo from '@/components/main/logo/index'
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'
export default Vue.extend({
  name: 'Main',
  components: {
    Login,
    User,
    Menu,
    Logo
  },
  data () {
    return {
      selectedPage: 'index',
      loginShow: false,
      timer: null
    }
  },
  computed: {
    ...mapGetters({
      token: 'getToken'
    })
  },
  updated () {
    console.log((this as any).$route)
  },
  methods: {
    loginSuccess () {
      (this as any).loginShow = false
      // (this as any).loginShow = false
    },
    handleTurnToPage (name: string) : void {
      if (this['$route'].path !== `/${name}`) {
        this.selectedPage = name
        this['$router'].push({
          name: name
        })
      }
    }
  }
})
</script>
<style scoped lang="less">
@import './main.less';
</style>
