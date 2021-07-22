<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item name="/homepage" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item name="/cart" icon="cart" >购物车</van-tabbar-item>
      <van-tabbar-item name="/User" icon="setting">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<script>
export default {
  name: "Index",
  data(){
    // const Foo = {
    //   template:'..',
    //   beforeRouteEnter(to,from,next){
    //     if (this.$store.getters.GET_TOKEN !== null){
    //       next(vm => {
    //
    //       })
    //     }
    //   }
    // }
    return{
      active: ''
    }
  },
  created() {
    this.$router.push('/homepage')
  },
  methods: {
    onChange(index){
      this.$router.push(index)
    }
  }
}
</script>

<style scoped>

</style>