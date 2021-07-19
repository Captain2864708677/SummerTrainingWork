<template>
<!--    <van-tabs v-model="activeName">-->
<!--        <van-tab title="全部" name="a">内容 1</van-tab>-->
<!--        <van-tab title="待付款" name="b">内容 2</van-tab>-->
<!--        <van-tab title="待发货" name="c">内容 3</van-tab>-->
<!--        <van-tab title="待收货" name="d">内容 4</van-tab>-->
<!--        <van-tab title="待评价" name="e">内容 5</van-tab>-->
<!--        <van-tab title="退款/售后" name="f">内容 6</van-tab>-->
<!--    </van-tabs>-->
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
    </div>

</template>



<script>
import {NavBar} from 'vant'
export default {
  name: "Order",
  methods:{
      onClickLeft(){
          this.$router.back()
      },
      chooseAddress() {
          alert(1)
      }
  }
    // data(){
    //   return{
    //       activeName: 'e'
    //   }
    // }
}
</script>

<style scoped>
#order{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5 ;
}
</style>