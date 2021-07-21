<template>
  <div>
    <div>我是商品详情页，我就是为了测试商品支付</div>
    <van-button color="#ff5000" type="warning" @click="save()">生成订单</van-button>
  </div>
</template>

<script>
export default {
  name: "productDetail",
  data(){
    return{
      cartList:[//从购物车或商品详情像下面这样传就可以了
        // this.$router.push({path:'/order',query:{cartList:this.cartList}})
        {
          detail:'XXL',
          productNum:'2',
          price:11,
          productId:1,
          productName:'0111',
          img:''
        },{
          detail:'XXLL',
          productNum:'4',
          price:22,
          productId:1,
          productName:'01131',
          img:''
        },
      ],
    }
  },
  methods:{
    save(){
      this.$router.push({path:'/order',query:{cartList:this.cartList,form:this.form}})
    }
  }
}
</script>

<style scoped>

</style>