<template>
  <div class="css-trick-write">
    <div class="input">
      <div class="js">
        <p>js</p>
        <div class="content">
          <codemirror v-model="js" :options="jsOption"/>
        </div>
      </div>
      <div class="css">
        <p>css</p>
        <div class="content">
          <codemirror v-model="css" :options="cssOption"/>
        </div>
      </div >
      <div class="html">
        <p>html</p>
        <div class="content">
          <codemirror v-model="html" :options="htmlOption"/>
        </div>
      </div>
    </div>
    <div class="output"></div>
  </div>
</template>
<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/xml/xml.js'
import 'codemirror/mode/css/css.js'
import 'codemirror/theme/monokai.css'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/selection/mark-selection.js'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/match-highlighter.js'
export default {
  name: 'CssTrickWrite',
  components: {
    codemirror
  },
  data () {
    return {
      js: '',
      jsOption: {
        tabSize: 2,
        mode: 'text/javascript',
        theme: 'monokai',
        lineNumbers: true,
        line: true
      },
      html: '',
      htmlOption: {
        tabSize: 2,
        mode: 'text/html',
        theme: 'monokai',
        lineNumbers: true,
        line: true
      },
      css: '',
      cssOption: {
        tabSize: 2,
        mode: 'text/x-less',
        theme: 'monokai',
        lineNumbers: true,
        line: true
      }
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
