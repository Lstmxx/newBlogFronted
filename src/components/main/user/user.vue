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
          <li>test</li>
          <li>test2</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'User',
  mounted () {
    console.log('usergo')
    this.userName = localStorage.getItem('userName') || ''
  },
  data () {
    return {
      userName: '',
      selectOption: false,
      imagePath: 'https://b-gold-cdn.xitu.io/v3/static/img/frontend.1dae74a.png'
    }
  }
}
</script>

<style lang="less" scoped>
@import './user.less';
</style>
