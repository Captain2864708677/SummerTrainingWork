<template>
  <div>
    <div>
      <van-nav-bar left-text="返回" left-arrow @click-left="back">
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
    </div>
    <div class="scroll">
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in arr" :key="index">
        <van-image fit="contain" width="100%" height="100%" lazy-load :src="image" ></van-image>
      </van-swipe-item>
    </van-swipe>
    <div style="margin-top: 40px">
      <van-cell-group title="商品详情介绍">
        <van-cell style="margin-top: 10px" v-for="val in spuValue" :key="val.name" :value="val.value" >
          <template #title>
            <span class="titlePosition">{{val.name}}</span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>
    </div>
    <div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button type="warning" text="加入购物车" @click="showAddCart(0)"/>
        <van-goods-action-button type="danger" text="立即购买" @click="showAddCart(1)" />
      </van-goods-action>
    </div>
    <van-popup
        v-model="cartPop.cartShow"
        round
        closeable
        @click-close-icon="closeAddCart"
        close-icon-position="top-right"
        position="bottom"
        :style="{ height: '90%' }">
      <component
        :is="cartPop.component"
        :productId="this.query.productId"
        :skuValue="skuValue"
        :skuStock="skuStock"
        :skuValueList="skuValueList"
        :cartValue="cartValue"
        :spuValue="spuValue"
        :product="product"
        @getProductById="getProductById"
        @closeAddCart="closeAddCart"
      ></component>
    </van-popup>


  </div>

</template>

<script>

export default {
  name: "ProductDetail",

  data(){
    const module = '/pms-product'
    return {

      cartPop: {
        cartShow: false,
        component: () => import('./addtocart')
      },


      url: {
        //通过Id获取product对象
        getProductById: module + '/getProductById',

        //通过productId获取skuValue信息
        getSkuValueByProductId: module + '/getSkuValueByProductId',

        //获取库存信息及对应的单价
        getStockByProductId: module + '/getStockByProductId',

        //获取skuValue里面的value数组
        getSkuValueAsList: module + '/getSkuValueAsList',

        //通过productId获取spuValue信息
        getSpuValueByProductId: module + '/getSpuValueByProductId'
      },

      //skuValue里面的value
      skuValueList: null,

      //product存储了后端传过来的商品属性
      product: [],

      //skuValue存储了后端传过来的颜色、尺寸等分类信息
      skuValue: [],

      //获取商品库存
      skuStock: [],

      //通过productId获取spuValue信息
      spuValue: [],

      form: {
        categoryId: [],
        spus: [],
      },
      //通过productId获取product对象
      query: {
        productId: 20
      },
      //下面两个是有关图片数组存储时用的
      imgs: '',
      arr: [],

      //通过判断传值不同，显示不同按钮
      cartValue: -1
    }
  },
  created() {
    this.getProductById()
  },
  methods: {
    back() {
      this.$router.push('/homepage')
    },
    //获取尺码、颜色等分类信息
    getSkuValueByProductId(){
      this.get(this.url.getSkuValueByProductId, this.query, response => {
        this.skuValue = response
      })
    },
    //获取库存等信息
    getStockByProductId(){
      this.get(this.url.getStockByProductId, this.query, response => {
        this.skuStock = response
      })
    },
    //获取skuValue里面的value数组
    getSkuValueAsList(){
      this.get(this.url.getSkuValueAsList, this.query, response => {
        this.skuValueList = response
      })
    },
    //通过productId获取spuValue信息
    getSpuValueByProductId(){
      this.get(this.url.getSpuValueByProductId, this.query, response => {
        console.log(response)
        this.spuValue = response
      })
    },

    //获取商品信息
    getProductById(){
      this.get(this.url.getProductById, this.query, response => {
        this.product = response
        this.images()
        this.getSkuValueByProductId()
        this.getStockByProductId()
        this.getSkuValueAsList()
        this.getSpuValueByProductId()
      })
    },
    //处理轮播照片信息
    images(){
      this.imgs = this.product.pics.split(',')
      for (let i = 0; i < this.imgs.length; i++){
         this.arr.push(this.img(this.imgs[i].trim()))
      }
    },
    //显示加入购物车一栏
    showAddCart(cartValue){
      this.cartValue = cartValue
      this.cartPop.cartShow = true
    },

    //关闭加入购物车一栏
    closeAddCart(){
      this.cartValue = -1
      this.cartPop.cartShow = false
    }
  }

}
</script>

<style scoped lang="less">
.my-swipe{
  .van-swipe-item {
    width: 400px;
    height: 175px;
  }
}

.scroll{
  overflow: scroll;
  height: 510px;
  .titlePosition{
    float: left;
    vertical-align: middle;
  }
}

</style>