<template>
  <div class="main">
    <mySelf @turn-to-page="handleTurnToPage" :selectedPage="selectedPage"/>
    <div style="display: relative;float: right; width: 84%">
      <div class="content">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import mySelf from '@/views/mySelf/index'
export default Vue.extend({
  name: 'main',
  props: {
    msg: String
  },
  components: {
    mySelf
  },
  data () {
    return {
      selectedPage: 'notice'
    }
  },
  methods: {
    handleTurnToPage (name: string) : void {
      if (this['$route'].path !== `/${name}`) {
        this.selectedPage = name
        this['$router'].push({
          name: name
        })
      }
    }
  }
})
</script>
<style scoped lang="less">
@import './main.less';
</style>
