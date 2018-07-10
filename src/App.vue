<template>
  <div id="app">
    <router-view></router-view>
    <!--我们在router里的index中设置了meta属性，这里进行判断如果为true则显示-->
    <footer-guide v-show="$route.meta.showFooter"></footer-guide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide.vue'
export default {
  components: {
    FooterGuide
  },
  // 异步获取address
  mounted () {
    this.$store.dispatch('getAddress')
    this.$store.dispatch('getUserInfo')
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
