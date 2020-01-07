<template>
  <div class="logo">
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
      canvas = document.getElementById('canvas')
      ctx = canvas.getContext('2d')
      canvas.width = 180 * window.devicePixelRatio
      canvas.height = 40 * window.devicePixelRatio
      // canvas.style.width = sw + 'px'
      // canvas.style.height = sh + 'px'
      // ctx.scale(1 / window.devicePixelRatio, 1 / window.devicePixelRatio)
      // canvas.width = websiteTitle.offsetWidth
      // canvas.height = websiteTitle.offsetWidth * 3 / 4
      leon = new LeonSans({
        text: 'Lstmxx',
        color: ['#363636'],
        size: 50,
        weight: 400
      })
      this.leon = leon
      function animate (t) {
        requestAnimationFrame(animate)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        const x = 0
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
@import './logo.less';
</style>
