<template>
  <div class="websiteTitle">
    <canvas id="canvas"></canvas>
  </div>
</template>
<script >
import LeonSans from '../../libs/leon/src/index'
import { TweenMax, Power4 } from 'gsap'
export default {
  name: 'WebsiteTitle',
  data () {
    return {
      leon: {}
    }
  },
  methods: {
    draw () {
      if (this.leon) {
        let i
        let total = this.leon.drawing.length
        for (i = 0; i < total; i++) {
          TweenMax.killTweensOf(this.leon.drawing[i])
          TweenMax.fromTo(this.leon.drawing[i], 1.6, {
            value: 0
          }, {
            delay: i * 0.05,
            value: 1,
            ease: Power4.easeOut
          })
        }
      }
    },
    init () {
      let leon, canvas, ctx
      let websiteTitle = document.getElementsByClassName('websiteTitle')[0]
      const sw = window.screen.width
      const sh = window.screen.height
      const pixelRatio = window.devicePixelRatio * websiteTitle.offsetWidth / sw
      canvas = document.getElementById('canvas')
      ctx = canvas.getContext('2d')
      canvas.width = sw * pixelRatio
      canvas.height = sh * pixelRatio
      // canvas.style.width = sw + 'px'
      // canvas.style.height = sh + 'px'
      ctx.scale(pixelRatio, pixelRatio)
      leon = new LeonSans({
        text: 'Lstmxx',
        color: ['#363636'],
        size: 500,
        weight: 200
      })
      this.leon = leon
      function animate (t) {
        requestAnimationFrame(animate)
        ctx.clearRect(0, 0, sw, sh)
        const x = (sw - leon.rect.w) / 2
        const y = (sh - leon.rect.h) / 2
        leon.position(x, y)
        leon.draw(ctx)
      }
      requestAnimationFrame(animate)
    },
    update () {
      this.init()
      this.draw()
    }
  },
  mounted () {
    this['$nextTick'](() => {
      this.init()
      this.draw()
    })
  }
}
</script>
<style lang="less" scoped>
@import './website-title.less';
</style>
