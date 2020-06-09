<template>
  <div class="css-trick-write">
    <div class="input">
      <div class="js">
        <p>js</p>
        <div class="content">
          <div id="js"></div>
          <textarea @input="handleInputJs" @mousedown="handleCursorPosition"></textarea>
        </div>
      </div>
      <div class="css">
        <p>css</p>
        <div class="content">
          <div id="css" class=""></div>
          <textarea @input="handleInputCss"></textarea>
        </div>
      </div >
      <div class="html">
        <p>html</p>
        <div class="content">
          <div id="html"></div>
          <textarea @input="handleInputHtml"></textarea>
        </div>
      </div>
    </div>
    <div class="output"></div>
  </div>
</template>
<script>
export default {
  name: 'CssTrickWrite',
  data () {
    return {
      js: '',
      html: '',
      css: '',
      doubleReg: /[^\x00-\xff]/g
    }
  },
  methods: {
    handleCursorPosition (e) {
      console.log(e)
    },
    handleInputJs (e) {
      console.log(e)
      console.log(e.target.selectionStart)
      this.js = e.target.value
      const stringArray = this.js.split('\n')
      const js = document.getElementById('js')
      js.innerHTML = this.js
    },
    handleInputCss (e) {
      this.css = e.target.value
      const css = document.getElementById('css')
      css.innerHTML = this.css
    },
    handleInputHtml (e) {
      this.html = e.target.value
      console.log(this.html)
      const html = document.getElementById('html')
      html.innerHTML = this.html
    }
  }
}
</script>
<style lang="less" scoped>
@import './css-trick-write.less';
</style>
