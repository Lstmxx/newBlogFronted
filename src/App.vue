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
  width: 100vw;
  height: 100vh;
}
html, body{
  margin: 0px;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  overflow: hidden;
}
</style>
