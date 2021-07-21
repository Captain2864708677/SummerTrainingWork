<template>
  <div>
    <van-nav-bar
        title="付款"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
    ></van-nav-bar>
    <div>请选择支付方式</div>
    <van-cell>
      <van-button icon="alipay" block color="linear-gradient(to left, #0000ff, #539eff)" @click="ali">支付宝支付</van-button>
    </van-cell>
    <van-cell>
      <van-button icon="wechat-pay" block color="linear-gradient(to right, #099009, #6ff177)" @click="wechat">微信支付</van-button>
    </van-cell>
    <van-dialog
        v-model="show1"
        :title="title1"
        show-cancel-button
        @confirm="success">
      <img src="@/img/wechatpay.png" />
    </van-dialog>
    <van-dialog
        v-model="show2"
        :title="title2"
        show-cancel-button
        @confirm="success">
      <img src="@/img/alipay.jpg" />
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "beforePay",
  data(){
    return{
      show1:false,
      show2:false,
      title1:'微信支付',
      title2:'支付宝支付',
    }
  },
  methods:{
    onClickLeft(){
      //支付失败，进入订单状态界面
      this.$router.push({path:'/state',query:{stateId:1}})
    },
    wechat(){
      this.show1 = true
    },
    ali(){
      this.show2 = true
    },
    success(){
      this.$router.push('/afterPay')
    }
  }
}
</script>

<style scoped>
  img{
    width: 200px;
    height: 300px;
  }
</style>