<template>
  <div>
    <van-nav-bar
        left-text="当前订单"
        left-arrow
        @click-left="onClickLeft"
    ></van-nav-bar>
    <div class="title">收货信息</div>
    <div class="info">
      <div>收件人：{{address.name}}</div>
      <div>收件地址：{{address.address}}</div>
      <div>收件电话：{{address.tel}}</div>
      <div>邮政编码：{{address.postalCode}}</div>
    </div>


    <div class="title">订单详情</div>
    <div class="info">
      <div>商品名称：{{order.productName}}</div>
      <div>商品详情：{{order.detail}}</div>
      <div>商品数量：{{order.productNum}}</div>
      <div>商品价格：￥{{order.price}}</div>
      <div>总价：￥{{order.price*order.productNum}}</div>
    </div>

  </div>
</template>

<script>
export default {
  name: "orderDetail",
  data(){
    return{
      address:'',
      orderId:'',
      order:'',
      query:{
        orderId:'',
        chosenAddressId:''
      },
    }
  },
  created(){
    this.query.orderId = this.$route.query.orderId
    this.getData()
  },
  methods:{
    getData(){
      console.log(this.query.orderId)
      this.get('http://127.0.0.1:8090/cms-order/getone',this.query,response =>{
        this.order = response
        console.log('ord',response)
        this.query.chosenAddressId = this.order.addressId
        this.get('http://127.0.0.1:8090/cms-customer-address/getone',this.query,response =>{
          this.address = response
          console.log('add',response)
        })
      })
    },
    onClickLeft(){
      //回到主界面
      this.$router.push('/state')
    }
  }
}
</script>

<style scoped>
.title{
  font-size: 16px;
  background: #C22B2E;
  color: white;
}
  .info{
    font-size:14px;
    text-align: left;
  }
</style>