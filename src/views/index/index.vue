
<template>
  <div class='index'>
    <div>
      <Swiper :options="swiperOptions" :style="{ 'padding-bottom': imageList.length === 0 ? '30%' : '' }">
        <SwiperSlide v-for="(imagePath, index) in imageList" :key="index" class="image-warp">
          <div class="image" :style="{ 'background-image': `url(${imagePath})` }"></div>
        </SwiperSlide>
        <div class="swiper-pagination swiper-pagination-white" slot="pagination"></div>
        <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
        <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      </Swiper>
    </div>
    <div class="what-can-you-learn">
      <h1>在这里你能学到</h1>
      <TagCloud :tagList="tagList"/>
    </div>
    <div class="description">
      <div>
        <h2>一天一更</h2>
        <span>那是不存在的</span>
      </div>
      <div>
        <h2>一周一更</h2>
        <span>看看心情吧</span>
      </div>
      <div>
        <h2>一月一更</h2>
        <span>瞧不起谁呢</span>
      </div>
    </div>
    <div class="footer">
      <span>Copyright © 2020 Lstmxx 粤ICP备19018357号</span>
    </div>
  </div>
</template>
<script>
import { loadBingBg } from '@/libs/utility/background'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import TagCloud from '@/components/base/tag-cloud/index'
import 'swiper/css/swiper.css'
export default {
  name: 'index',
  components: {
    Swiper,
    SwiperSlide,
    TagCloud
  },
  mounted () {
    this.loadBgFromBing()
  },
  data () {
    return {
      tagList: [
        'vue',
        'python',
        'nginx',
        'flask',
        'javascript'
      ],
      imageList: [],
      swiperOptions: {
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }
  },
  methods: {
    loadBgFromBing () {
      loadBingBg().then((responseData) => {
        console.log(responseData)
        this.imageList = responseData.imageList
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang='less' scoped>
@import './index.less';
</style>
