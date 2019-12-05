<template>
  <div class="websiteTitle">
    <canvas id="canvas"></canvas>
  </div>
</template>
<script >
import LeonSans from '_l/leon/src/index'
import { TweenMax, Power4 } from 'gsap'
export default {
  name: 'WebsiteTitle',
  data () {
    return {
      leon: {},
      devicePixelRatio: 0,
      width: 0
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
      this.devicePixelRatio = window.devicePixelRatio
      this.width = websiteTitle.offsetWidth
      const pixelRatio = websiteTitle.offsetWidth / sw
      canvas = document.getElementById('canvas')
      ctx = canvas.getContext('2d')
      // canvas.width = websiteTitle.offsetWidth * window.devicePixelRatio
      // canvas.height = websiteTitle.offsetWidth * 3 / 4 * window.devicePixelRatio
      // canvas.style.width = sw + 'px'
      // canvas.style.height = sh + 'px'
      // ctx.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio)
      // canvas.width = websiteTitle.offsetWidth
      // canvas.height = websiteTitle.offsetWidth * 3 / 4
      leon = new LeonSans({
        text: 'Lstmxx',
        color: ['#363636'],
        size: 100,
        weight: 350
      })
      this.leon = leon
      function animate (t) {
        requestAnimationFrame(animate)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const x = (canvas.width - leon.rect.w) / 2
        const y = (canvas.height - leon.rect.h) / 2
        leon.position(x, y)
        // leon.position(0, 0)
        leon.draw(ctx)
      }
      requestAnimationFrame(animate)
    },
    updateCanvas () {
      this.init()
      this.draw()
    }
  },
  mounted () {
    this['$nextTick'](() => {
      this.init()
      this.draw()
      let that = this
      window.onresize = () => {
        return (() => {
          that.updateCanvas()
        })()
      }
    })
  }
}
</script>
<style lang="less" scoped>
@import './website-title.less';
</style>
