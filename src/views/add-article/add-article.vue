<template>
  <div class="add-article">
    <div class="tag-and-title">
    </div>
    <div class="markdown">
      <textarea class="origin" v-model="content" @drop="getImage"></textarea>
      <div class="marked" v-highlight v-html="markedContent"></div>
    </div>
    <!-- <mavon-editor v-model="content" @imgAdd="addImage" @imgDel="delImage"></mavon-editor> -->
  </div>
</template>

<script>
import marked from 'marked'
import { upLoad } from '_l/request'
export default {
  name: 'AddArticle',
  data () {
    return {
      content: '',
      markedContent: '',
      tag: '',
      imageList: {}
    }
  },
  watch: {
    content () {
      this.markedContent = marked(this.content)
    }
  },
  methods: {
    getImage (e) {
      e.preventDefault()
      e.stopPropagation()
      const file = e.dataTransfer.files[0]
      if (!file.type.includes('image')) {
        console.log('请上传图片文件')
        return
      }
      let param = new FormData()
      param.append('image', file)
      let getProgress = (e) => {
        console.log(((e.loaded / e.total * 100) | 0) + '%')
      }
      upLoad(param, getProgress).then((responseData) => {
        console.log(responseData)
      }).catch((err) => {
        console.log(err)
      })
      console.log(file)
    },
    addImage (fileName, imageFIle) {
      console.log(fileName)
      console.log(imageFIle)
    },
    delImage (fileName) {
      console.log(fileName)
    },
    initMarkdownPlace () {
      let dropEle = document.querySelector('.origin')
      if (dropEle) {
        let stop = (e) => {
          e.preventDefault()
          e.stopPropagation()
        }
        dropEle.addEventListener('dragenter', stop, false)
        dropEle.addEventListener('dragover', stop, false)
        dropEle.addEventListener('dragleave', stop, false)
        dropEle.addEventListener('drop', stop, false)
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.initMarkdownPlace()
    })
  },
  mounted () {
    this.initMarkdownPlace()
  }
}
</script>

<style lang="less" scoped>
@import './add-article.less';
</style>
