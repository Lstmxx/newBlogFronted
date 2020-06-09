<template>
  <div id="article-detail-container" class="container">
    <div class="article-detail">
      <div class="article-menu">
        <ul>
          <li v-for="(data, index) in silderBar" :key="index">
            <a
            :class="{
              'selected': index === selectedIndex,
              'h2': data.type === 'h2',
              'h3': data.type === 'h3'
            }"
            :href="data.url"
            @click.stop="select(index)"
            >{{data.content}}</a>
          </li>
        </ul>
      </div>
      <div class="article-content">
        <h1 class="header-anchor" :id='article.name'>{{article.name}}</h1>
        <div id="article-content" v-highlight class="content">
        </div>
        <div class="footer">
          <div class="button-group">
          </div>
          <div class="time-author">
            <p>{{article.createTime}}</p>
            <p>{{author.username}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import marked from 'marked'
import { getDetail } from '@/libs/request'
import { normalizeTimeDetail } from '@/libs/utility/time'
import { handleScroll } from '@/libs/utility/scroll'
export default {
  name: 'ArticleDetail',
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm['loadArticleDetail'](vm['$route']['query']['id'])
    })
  },
  data () {
    return {
      showLoding: false,
      article: {},
      silderBar: [],
      paddingLeft: 0,
      selectedIndex: -1,
      author: {}
    }
  },
  mounted () {
    handleScroll('article-detail-container', this.handleScroll)
  },
  methods: {
    handleScroll (event) {
      const headerAnchorList = document.getElementsByClassName('header-anchor')
      const title = document.getElementsByClassName('title')[0]
      const scrollTop = event.target.scrollTop + title.offsetHeight
      const last = headerAnchorList.length - 1
      if (scrollTop < headerAnchorList[0].offsetTop) {
        history.replaceState('', '', `#${headerAnchorList[0].id}`)
        this.selectedIndex = 0
      } else if (scrollTop >= headerAnchorList[last].offsetTop) {
        history.replaceState('', '', `#${headerAnchorList[last].id}`)
        this.selectedIndex = last
      } else {
        for (let i = 0; i < headerAnchorList.length - 1; i++) {
          if (scrollTop >= headerAnchorList[i].offsetTop && scrollTop < headerAnchorList[i + 1].offsetTop) {
            history.replaceState('', '', `#${headerAnchorList[i].id}`)
            this.selectedIndex = i
            break
          }
        }
      }
    },
    select (index) {
      this.selectedIndex = index
    },
    buildSilderBar (content) {
      const findHContentReg = /<(h1|h2|h3).*>(.*)<\/\1>/g
      const silderBar = [{
        type: 'h1',
        content: this.article.name,
        url: `#${this.article.name.replace()}`
      }]
      while (findHContentReg.exec(content) !== null) {
        if (RegExp.$2) {
          silderBar.push({
            type: RegExp.$1,
            content: RegExp.$2,
            url: `#${RegExp.$2}`
          })
        }
      }
      this.silderBar = silderBar
    },
    loadArticleDetail (id) {
      this.$Loading.show()
      let config = {
        url: '/article/detail',
        data: {
          id
        }
      }
      getDetail(config).then((responseData) => {
        marked.setOptions({
          langPrefix: 'lang '
        })
        const hReg = /<(h1|h2|h3).*>(.*)<\/\1>/g
        const codeReg = /<code class="(.*)">/g
        const article = responseData.article
        const idList = []
        article.content = marked(article['content'])
          .replace(hReg, (m, s1, s2, s3) => {
            idList.push(s2)
            return `<${s1} id="${s2}" class="header-anchor">${s2}</${s1}>`
          })
          .replace(codeReg, (m, s1) => {
            const name = s1.split(' ')[1]
            return `<code class="${s1}" data-content="${name}">`
          })
        article.createTime = normalizeTimeDetail(article.create_time)
        this.article = article
        this.buildSilderBar(article.content)
        const content = document.getElementById('article-content')
        content.innerHTML = this.article.content
        this.author = responseData.author
        this.$Loading.hide()
      }).catch((err) => {
        this.$Loading.hide()
        console.log(err)
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import './article-detail.less';
</style>
