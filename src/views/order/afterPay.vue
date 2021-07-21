<template>
  <div>
    <van-nav-bar
        left-text="当前订单"
        left-arrow
        @click-left="onClickLeft"
    ></van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "afterPay",
  methods:{
    onClickLeft(){
      //回到主界面
      this.$router.push('/homepage')
    }
  }
}
</script>

<style scoped>

</style>