/* eslint-disable */
<template>
  <div class="main">
    <div class="title">
      <div class="logo-menu">
        <Logo></Logo>
        <Menu
        @turn-to-page="handleTurnToPage"
        :selectedPage="selectedPage"
        :scroll="scroll">
        </Menu>
      </div>
      <div class="login" v-if="!showUser">
        <span :class="{selected: loginShow, notSelected: !loginShow}" @click.stop="loginShow = true">Login</span>
      </div>
      <div class="login-success" v-else>
        <User @to-option="toOption" style="z-index: 3"></User>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view/>
      </keep-alive>
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
import { getUserInfo } from '@/libs/request'
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
      (this as any).scroll = document.getElementsByClassName('content')[0].scrollTop
      console.log(document.getElementsByClassName('content')[0].scrollTop)
    },
    handleTurnToPage (name: string) : void {
      if (this['$route'].path !== `/${name}`) {
        this.selectedPage = name
        this['$router'].push({
          name: name
        })
      }
    },
    // test () {
    //   function arrayMap (callback, args) {
    //     let that = (this as any)
    //     if (this === null || this === undefined) {
    //       throw new TypeError("Cannot read property 'map' of null or undefined")
    //     }
    //     if (Object.prototype.toString.call(callback) !== '[object Function]') {
    //       throw new TypeError(callback + 'is not a function')
    //     }
    //     let O = Object(this)
    //     let a = args
    //     let len = O.length >>> 0
    //     let result = new Array(len)
    //     for (let index = 0; index < len; index++) {
    //       if (index in O) {
    //         let value = O[index]
    //         let mappedValue = callback.call(this, a, value, index, O)
    //         result[index] = mappedValue
    //       }
    //     }
    //     return result
    //   }
    //   Array.prototype.map = arrayMap
    //   let test = [{ a: 1, b: 2 }, { a: 1, b: 2 }, { a: 1, b: 2 }]
    //   let test1 = test.map((arg, data, index, array) => {
    //     console.log(arg)
    //     console.log(data)
    //     console.log(index)
    //     return (data as any).a
    //   }, 2)
    //   console.log(test1)
    // },
    loadUserInfo () {
      getUserInfo().then((responseData) => {
        console.log(responseData)
        sessionStorage.setItem('userName', responseData.userInfo.name);
        (this as any).loginSuccess()
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  mounted () {
    (this as any).loadUserInfo()
    window.addEventListener('scroll', (this as any).menu, true)
  }
})
</script>
<style scoped lang="less">
@import './main.less';
</style>
