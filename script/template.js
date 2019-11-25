function handleComponentName (componentName) {
  let res = ''
  if (componentName.indexOf('-') !== -1) {
    componentName.split('-').forEach((item) => {
      res += item[0].toUpperCase() + item.substring(1).toLowerCase()
    })
  } else {
    res = componentName[0].toUpperCase() + componentName.substring(1).toLowerCase()
  }
  return res
}
module.exports = {
  vueTemplate: componentName => {
    let res = handleComponentName(componentName)
    // let res = componentName
    return `<template>
  <div class="${res[0].toLowerCase() + res.slice(1)}">
  </div>
</template>
<script lang="ts">
export default {
  name: '${res}',
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
@import './${componentName}.less';
</style>\n`
  },
  indexTemplate: componentName => {
    // let res = componentName
    let res = handleComponentName(componentName)
    return `import ${res} from './${componentName}.vue'
export default ${res}`
  },
  lessTemplate: componentName => {
    let res = handleComponentName(componentName)
    return `.${res[0].toLowerCase() + res.slice(1)}{
  height: 100%;
  width: 100%;
}`
  }
}