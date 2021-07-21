<template>
<<<<<<< HEAD
    <div id="order">
        <!--导航栏-->
        <van-nav-bar
        title="填写订单"
        left-text="返回"
        left-arrow
        :fixed=true
        :border=true
        @click-left="onClickLeft"
    />
        <!--收货地址-->
        <van-contact-card
            type="add"
            add-text="选择收货地址"
            @click="chooseAddress"
            style= "margin-top: 3rem"
        />
        <!--商品详情-->
        <van-card
                :num="this.name"
                price="2.00"
                desc="描述信息"
                title="商品标题"
                thumb="https://img01.yzcdn.cn/vant/ipad.jpeg"
        >
            <template #tags>
                <van-tag plain type="danger">标签</van-tag>
                <van-tag plain type="danger">标签</van-tag>
            </template>
            <template #footer>
                <van-button size="mini">按钮</van-button>
                <van-button size="mini">按钮</van-button>
            </template>
        </van-card>
    <van-cell-group style="margin-top: 0.6rem">
        <van-cell title="送达时间" value="请选择送达时间" is-link/>
<!--        <van-cell value="共5件" is-link center>-->
<!--            <template #title>-->
<!--                <img src="index.vue" alt="" style="width: 3rem">-->
<!--                <img src="index.vue" alt="" style="width: 3rem">-->
<!--                <img src="index.vue" alt="" style="width: 3rem">-->
<!--            </template>-->
<!--        </van-cell>-->
    </van-cell-group>
    <van-cell-group style="margin-top: 0.6rem">
        <van-cell title="支付方式" value="微信" is-link/>
    </van-cell-group>
    <!--备注-->
    <van-cell-group style="margin-top: 0.6rem">
        <van-cell title="备注" value="微信" >
            <label>
                <input type="text" placeholder="选填，备注您的需求！">
            </label>
        </van-cell>
    </van-cell-group>
    <!--商品金额，配送费-->
    <van-cell-group style="margin-top: 0.6rem">
        <van-cell title="商品金额" value="23" />
        <van-cell title="配送费" value="3" />
    </van-cell-group>
    <!--提交订单-->
    <van-submit-bar
        :price="3050"
        label="实付"
        button-text="提交订单"
        @submit="onSubmit"
    />
=======
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
>>>>>>> zym
    </div>

</template>

<<<<<<< HEAD


<script>
import {NavBar} from 'vant'
export default {
  name: "Order",
  data(){
      return{
          num: 2,

      }
  },
  methods:{
      onClickLeft(){
          this.$router.back()
      },
      chooseAddress() {
          alert(1)
      }
  }
}
</script>

<style scoped>
#order{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5 ;
=======
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
>>>>>>> zym
}
</style>