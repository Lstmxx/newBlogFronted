<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  font-size: 16px;
  font-family: Gotham-Book;
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #363636;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
}
html, body{
  margin: 0px;
  width: 100%;
  height: 100%;
  background-image: url(https://cn.bing.com/th?id=OHR.SeussianLandscape_ZH-CN0785428057_1920x1080.jpg&rf=LaDigue_1920x1080.jpg&pid=hp);
  overflow: hidden;
}
ul{
  margin-block-start: 0!important;
  margin-block-end: 0!important;
  list-style: none;
  padding: 0;
}
</style>
