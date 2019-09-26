<template>
  <div class="main">
    <MySelf @turn-to-page="handleTurnToPage" :selectedPage="selectedPage"/>
    <div style="display: relative;float: right; width: 86%">
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
import MySelf from '@/views/my-self/index'
export default Vue.extend({
  name: 'Main',
  props: {
    msg: String
  },
  components: {
    MySelf
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
