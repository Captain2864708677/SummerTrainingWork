<template>
    <div>
      <van-nav-bar
              class="van-nav-bar"
              style="background-color: orangered"
          title="确认订单"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
          ></van-nav-bar>

      <van-cell :value="addressInfo" is-link icon="location-o"  @click="address"  />

        <div v-for="item in cartList"  >
            <van-card
                    :num="item.productNum"
                    :price="item.price"
                    tag="聚划算"
                    :title="item.productName"
                    :desc="item.detail"
                    thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
            >
                <template #footer>
                    <van-row class="card-foot">
                        <van-col span="16"></van-col>
                        <van-col span="8">
                            <div style="color: red;font-size:12px ">总价：￥{{item.price*item.productNum}}</div>
                        </van-col>
                    </van-row>
                </template>
            </van-card>
        </div>

        <van-submit-bar
                style="background-color: #eeeeee"
                :price=this.price
                label=""
                button-text="提交订单"
                @submit="onSubmit">
<!--            <template #tip>-->
<!--                请在 <van-count-down :time="time" />内完成订单-->
<!--            </template>-->

        </van-submit-bar>
    </div>

</template>

<script>
    import {Toast} from 'vant'
export default {
  name: "order",
  data(){
    return{
        cartList:[],
        orderList:[],
        form:[],
        productId:'',
        url: {
            list: '/cms-shopping-cart/list',
            getDefaultId:'/cms-customer-address/getDefault',
            addOrder:'/cms-order/addorder'
        },
        query: {
            productId: '',
            cutomerId:1,
                addressId:'',
                price : '',
                detail : '',
                img : '',
                productName : '',
                productNum : '',
        },
      addressId:0,
      price:'',
      defaultAddress:{},
        addressInfo:'',
        adr:'',
      name:'',
    }
  },
  created() {
          this.addressId = this.$route.query.chosenAddressId
          this.addressInfo = this.$route.query.addressInfo
      this.name = this.$route.query.name
      this.adr = this.$route.query.address
      this.get(this.url.getDefaultId, this.query, response => {
          console.log(this.addressId,response)
          this.defaultAddress = response
          if(typeof(this.addressId) === "undefined"){//未选择地址时显示默认地址
              this.addressInfo = this.defaultAddress.name + '|' +this.defaultAddress.address
          }else{
              this.addressInfo = this.name + '|' +this.adr
          }
      })
      this.cartList = this.$route.query.cartList
          this.getData()
      },
  methods:{
      getData() {
          console.log('cartlist',this.cartList)
          // console.log('form',this.form)
          let total=0;
          for(let i =0;i<this.cartList.length;i++){
              total += this.cartList[i].price*this.cartList[i].productNum
          }
          this.price = total*100
      },
    onSubmit(){
      //提交成功，进入支付界面
        console.log(this.orderList)
        for(let i=0;i<this.cartList.length;i++){
            if(typeof(this.addressId) === "undefined"){//设置了地址
                this.query.addressId = this.defaultAddress.id
            }else{
                this.query.addressId = this.addressId
            }
            this.query.customerId = this.customerId
            this.query.detail = this.cartList[i].detail
            this.query.img = this.cartList[i].img
            this.query.price = this.cartList[i].price
            this.query.productId = this.cartList[i].productId
            this.query.productName = this.cartList[i].productName
            this.query.productNum = this.cartList[i].productNum
            this.query.stateId = 1
            this.get(this.url.addOrder, this.query, response => {
                console.log('addorder',response)
            })
        }
      this.$router.push('/beforePay')
    },
    onClickLeft(){
      //提交失败，进入订单状态界面
      this.$router.go(-1)
    },
    address(){
      this.$router.push({path:'/addressSelect',query:{
          cartList:this.cartList
          }})
    },
    shoppingdetail(){
          this.$router.push('/addressSelect')
    },

  },
}
</script>

<style scoped lang="less">
   .van-nav-bar__title{
    color: white;
}
</style>