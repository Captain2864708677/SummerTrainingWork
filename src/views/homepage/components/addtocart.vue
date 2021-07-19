<template>
  <div style="margin-top: 60px">
    <van-cell style="margin-top: 20px" :title-style="{color: '#db3a3a', fontSize: '14px'}" size="large" >
      <template #title>
         ￥{{standardShow.price}}
      </template>
      <template #label>
        库存 {{standardShow.stock}} 件
        <div class="showCategoryIntroduction">
          请选择分类
        </div>
      </template>
    </van-cell>
    <van-field
        style="margin-top: 7px"
        readonly
        clickable
        label="尺寸"
        :value="showValue"
        placeholder="选择颜色尺码"
        @click="showPicker = true"
    />
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="onConfirm"
      />
    </van-popup>
    <van-cell style="margin-top: 20px">
      <template #title>
        <div style="float:left">
          购买数量(限购5件)
        </div>
        <van-stepper class="stepperStyle" v-model="amount" max="5" theme="round" button-size="22" disable-input @overlimit="limitAmount" ></van-stepper>
      </template>
    </van-cell>

    <div style="margin-top: 240px">
      <van-button v-if="cartValue === 0" size="large" color="linear-gradient(to right, #ff6034, #ee0a24)"
                  round type="info" @click="save">确认</van-button>
      <van-button v-if="cartValue === 1" size="large" color="linear-gradient(to right, #ff6034, #ee0a24)"
                  round type="info" @click="save">立即下单</van-button>
    </div>

  </div>

</template>

<script>
import {Toast} from "vant";

export default {

  name: "AddToCart",
  props: {
    skuValue: {
      type: Array,
      default: () => {return []}
    },
    skuStock: {
      type: Array,
      default: () => {return []}
    },
    productId: {
      type: Number,
      default: null
    },
    skuValueList: {
      type: Array,
      default: () => {return []}
    },
    cartValue:{
      type: Number,
      default: null
    }
  },
  data(){
    const module = '/pms-add-cart'
    const color = this.skuValueList[0]
    const size = this.skuValueList[1]
    return {
      //保存到购物车
      url: {
        //添加到数据库
        add: module + '/add'

      },

      //以下四个属性时选择尺码颜色时的属性
      value: null,
      showPicker: false,
      showValue: '',
      columns: [
        {
          values: color
        },
        {
          values: size
        }
      ],


      standardShow: {
        stock: 0,
        price: 0,
      },

      //购物车限购数量
      amount: null,

      form: {
        detail: null,
        amount: null,
        price: null,
        productId: null,
      }

    }
  },
  created() {
    this.showStandardStockAndPrice()
  },
  methods: {

    //购物车栏打开时显示库存和标准价格
    showStandardStockAndPrice(){
      let stock = 0
      for (let i = 0 ; i < this.skuStock.length ; i++){
       stock = stock + this.skuStock[i].stock
      }
      this.standardShow.stock = stock
      this.standardShow.price = this.skuStock[0].price
    },

    //选择尺寸时记录选择的内容
    onConfirm(value){
      console.log(value)
      this.value = value;
      this.showPicker = false;
      this.splitValue()
    },
    //分类显示，将数组拆开
    splitValue() {
      this.showValue = this.value[0] + " " + this.value[1]
    },
    //轻提示超出范围
    limitAmount(){
      if (this.amount <= 1 || this.amount >= 5){
        Toast.fail({
          message: '超出限购范围了哦',
          duration: 400,
          overlay: true,
          forbidClick: true
        })
      }
    },
    //添加到购物车
    save(){
      this.form.detail = this.showValue
      this.form.amount = this.amount
      this.form.price = this.standardShow.price
      this.form.productId = this.productId
      if (this.cartValue === 0){
        this.post(this.url.add, this.form, () => {
          this.$emit('closeAddCart')
          this.$emit('getProductById')
        })
      }else {
        //跳转到直接下单页面



      }
    }
  }
}
</script>

<style scoped lang="less">
.showCategoryIntroduction{
  font-size: 15px;
  margin-top: 7px;
  color: #393636;
}
.stepperStyle{
  margin-left: 255px;
}



</style>