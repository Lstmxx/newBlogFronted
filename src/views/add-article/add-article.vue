<template>
  <div class="add-article">
    <div class="tag-and-title">
    </div>
    <div class="markdown">
      <textarea class="origin" v-model="content" @drop="getImage" v-if="showContent"></textarea>
      <div :class="{ 'marked': true, 'show-full-marked': !showContent }" v-highlight v-html="markedContent"></div>
    </div>
    <!-- <mavon-editor v-model="content" @imgAdd="addImage" @imgDel="delImage"></mavon-editor> -->
  </div>
</template>

<script>
import marked from 'marked'
import { upLoad } from '_l/request'
import { baseImageUrl } from '../../config/config'
export default {
  name: 'AddArticle',
  data () {
    return {
      showContent: true,
      content: '',
      markedContent: '',
      tag: '',
      imageList: {},
      maxImageSize: 900
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
      let file = e.dataTransfer.files[0]
      if (!file.type.includes('image')) {
        console.log('请上传图片文件')
        return
      }
      let reader = new FileReader()
      reader.readAsDataURL(file)
      const devicePixelRatio = window.devicePixelRatio
      reader.onload = (e) => {
        console.log(e)
        let img = new Image()
        img.src = e.target.result
        img.onload = () => {
          if (img.width > this.maxImageSize || img.height > this.maxImageSize) {
            let canvas = document.createElement('canvas')
            let context = canvas.getContext('2d')
            let widthScale = 0
            let scale = 0
            let width = this.maxImageSize
            let height = this.maxImageSize
            if (img.width > img.height) {
              height = this.maxImageSize / img.width * img.height
            } else if (img.width < img.height) {
              width = this.maxImageSize / img.height * img.width
            }
            width *= devicePixelRatio
            height *= devicePixelRatio
            canvas.width = width
            canvas.height = height
            context.drawImage(img, 0, 0, width, height)
            canvas.toBlob((blob) => {
              let param = new FormData()
              param.append('image', blob, file.name)
              let getProgress = (e) => {
                console.log(((e.loaded / e.total * 100) | 0) + '%')
              }
              upLoad(param, getProgress).then((responseData) => {
                this.content += `<div align=center>
  <img src="${baseImageUrl + responseData.imageName}"/>
</div>`
                console.log(responseData)
              }).catch((err) => {
                console.log(err)
              })
            })
          } else {
            let param = new FormData()
            param.append('image', file)
            let getProgress = (e) => {
              console.log(1)
              console.log(((e.loaded / e.total * 100) | 0) + '%')
            }
            upLoad(param, getProgress).then((responseData) => {
              this.content += `<div align=center>
  <img src="${baseImageUrl + responseData.imageName}"/>
</div>`
              console.log(responseData)
            }).catch((err) => {
              console.log(err)
            })
          }
        }
      }
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
    document.onkeydown = (e) => {
      let keyCode = e.keyCode || e.which || e.charCode
      let altKey = e.altKey
      if (altKey && keyCode === 80) {
        this.showContent = !this.showContent
        console.log('yes')
      }
    }
    this.initMarkdownPlace()
  }
}
</script>

<style lang="less" scoped>
@import './add-article.less';
</style>
