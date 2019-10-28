<template>
  <div class="login">
    <div class="mask" @click="close"></div>
    <div :class="{ 'loginBox': true, 'show': show }">
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: 'Login',
  data () {
    return {
      show: false
    }
  },
  methods: {
    close () : void {
      (this as any).$emit('input', false)
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
