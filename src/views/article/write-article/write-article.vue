<template>
  <div class="add-article">
    <div class="bar">
      <div class="tag-and-title">
        <MySelect :optionList="tagList" v-model="article.tagId" targetKey="value"/>
        <input class="title" type="text" v-model="article.name" placeholder="文章标题搞快点">
      </div>
      <MyButton text="提交" @on-click="saveArticle"></MyButton>
    </div>
    <div class="markdown">
      <textarea class="origin" v-model="article.content" @drop="getImage" v-if="showContent"></textarea>
      <div :class="{ 'marked': true, 'show-full-marked': !showContent }" v-highlight v-html="markedContent"></div>
    </div>
    <Loading v-if="showLoding"></Loading>
    <!-- <mavon-editor v-model="content" @imgAdd="addImage" @imgDel="delImage"></mavon-editor> -->
  </div>
</template>

<script>
import marked from 'marked'
import { upLoad, getList, store } from '_l/request'
import { baseImageUrl } from '@/config/config'
import MyButton from '@/components/base/button/index'
import MySelect from '@/components/base/select/index'
export default {
  name: 'WrtieArticle',
  components: {
    MyButton,
    MySelect
  },
  data () {
    return {
      showContent: true,
      markedContent: '',
      article: {
        name: '',
        tagId: 1,
        content: '',
        description: ''
      },
      tagList: [],
      maxImageSize: 900,
      showLoding: false
    }
  },
  watch: {
    'article.content' () {
      this.markedContent = marked(this.article.content)
    }
  },
  methods: {
    clear () {
      this.tagList = []
      this.showContent = true
      this.showLoding = false
      this.markedContent = ''
      this.article = {
        name: '',
        tagId: 1,
        content: '',
        description: '',
        avatarImage: ''
      }
    },
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
              upLoad(param, getProgress, 'image').then((responseData) => {
                this.article.content += `<div align=center>
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
            upLoad(param, getProgress, 'image').then((responseData) => {
              this.article.content += `<div align=center>
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
    saveArticle () {
      this.showLoding = true
      const removeTagReg = /<\/*[a-zA-Z]+.*?>/g
      this.article.description = this.markedContent.replace(removeTagReg, '')
      const imageReg = /<img src="(.*)"\/>/g
      this.article.avatarImage = this.article.content.match(imageReg)[0].replace(/img|<|\/>|src="|"/g, '')
      const config = {
        url: 'article',
        data: {
          article: this.article
        }
      }
      store(config).then((responseData) => {
        this.showLoding = false
        this.$router.push({
          name: 'article',
          query: {
            reload: true
          }
        })
      }).catch((err) => {
        this.showLoding = false
        console.log(err)
      })
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
    },
    loadTagList () {
      let config = {
        url: '/tag'
      }
      getList(config).then((responseData) => {
        console.log(responseData)
        this.tagList = responseData.tagList.map(data => {
          return { name: data.tag_name, value: data.id }
        })
        // console.log(responseData)
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.clear()
      vm.loadTagList()
      vm.initMarkdownPlace()
    })
  },
  beforeRouteLeave (to, from, next) {
    next((vm) => {
      vm.clear()
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
@import './write-article.less';
</style>
