<template>
  <div class="head">
    <canvas id="canvas"></canvas>
  </div>
</template>
<script lang="ts">
import LeonSans from '../../libs/leon/src/index'
export default {
  name: 'head',
  data () {
    return {
    }
  },
  methods: {
    init () {
      let leon, canvas, ctx
      const pixelRatio = 10
      canvas = document.getElementById('canvas')
      canvas.width = 400 * pixelRatio
      canvas.height = 200 * pixelRatio
      ctx = canvas.getContext('2d')
      ctx.scale(pixelRatio, pixelRatio)
      leon = new LeonSans({
        text: 'Lstmxx',
        color: ['#000000'],
        size: 100,
        weight: 200
      })
      console.log(leon)
      leon.draw(ctx)
    }
  },
  mounted () {
    this['$nextTick'](() => {
      this['init']()
    })
  }
}
</script>
<style lang="less" scoped>
@import './head.less';
</style>
