<template>
  <div id="NavBar">
    <van-nav-bar
        :title="title"
        left-arrow
        :left-text="left"
        @click-left="onClickLeft"
        >
    </van-nav-bar>
  </div>

</template>

<script>
import {NavBar} from 'vant'
//想着封装一个NavBar组件，但是发现不好用，先留着吧，后面完善的时候在写
export default {
  components: {
    [NavBar.name]:NavBar
  },
  props:["title","left"],
  methods:{
    onClickLeft(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>

</style>