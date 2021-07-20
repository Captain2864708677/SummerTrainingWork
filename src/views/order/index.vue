<template>
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
    </div>

</template>



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
}
</style>