<template>
  <div class="login">
    <div class="mask" @click="close"></div>
    <div :class="{ 'loginBox': true, 'show': show }">
      <label for="usrname">账号</label>
      <div :class="{ 'inputDiv': true, 'correct': usernameValid, 'incorrect': !usernameValid }">
        <input type="username" v-model="username" placeholder="5到8位用户名" maxlength="8">
      </div>
      <label for="password">密码</label>
      <div :class="{ 'inputDiv': true, 'correct': passwordValid, 'incorrect': !passwordValid }">
        <input type="password" v-model="password" placeholder="8到10位密码" maxlength="10">
      </div>
      <div class="loginButton" @click="submit('login')">
        <span>login</span>
      </div>
      <div class="loginButton" @click="submit('register')">
        <span>register</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { login } from '@/libs/request'
export default {
  name: 'Login',
  data () {
    return {
      show: false,
      username: '',
      password: ''
    }
  },
  computed: {
    usernameValid () {
      const usernameValid : Boolean = /.{5,8}/.test((this as any).username)
      return usernameValid
    },
    passwordValid () {
      const passwordValid : Boolean = /[a-zA-Z0-9]{8,10}/.test((this as any).password)
      return passwordValid
    }
  },
  methods: {
    close () : void {
      (this as any).$emit('input', false)
    },
    submit (type : String) :void {
      if ((this as any).usernameValid && (this as any).passwordValid) {
        let config = {
          url: type === 'login' ? '/login' : '/register',
          data: {
            username: (this as any).username,
            password: (this as any).password
          }
        }
        login(config).then((responseData) => {
          localStorage.setItem('token', responseData.token)
          sessionStorage.setItem('userName', responseData.userName);
          (this as any).$emit('on-login-success')
        }).catch((err) => {
          console.log(err)
        })
      }
    }
  },
  mounted () {
    (this as any).show = true
  }
}
</script>
<style lang="less" scoped>
@import './login.less';
</style>
