<template>
    <div>
      <van-nav-bar
          title="确认订单"
          left-text="返回"
          left-arrow
          @click-left="onClickLeft"
          ></van-nav-bar>
      <van-cell :title="name" :value="defaultAddress" is-link icon="location-o"  @click="address"  />
        <van-submit-bar
            :price="this.price"
            label=""
            button-text="提交订单"
            @submit="onSubmit">
          <van-checkbox v-model="checked">全选</van-checkbox>
          <template #tip>
            请在 <van-count-down :time="time" />内完成订单
          </template>

      </van-submit-bar>
    </div>

</template>

<script>
export default {
  name: "order",
  data(){
    const module = '/cms-customer-address'
    return{
      addressId:null,
      price:25510,
      checked:false,
      time:30 * 60 * 1000,
      defaultAddress:"我是从数据库读出的默认收货地址",
      name:'',
      url:{
        getDefault:module+'/getDefault'
      }
    }
  },
  created() {
    if (this.$route.query.identity === "1"){
      this.get(this.url.getDefault,{},response =>{
        this.addressId = response.id
        this.defaultAddress = response.address
        this.name = response.name
      })
    }else {
      this.addressId = this.$route.query.chosenAddressId
      this.defaultAddress = this.$route.query.address
      this.name = this.$route.query.name
    }

  },
  methods:{
    onSubmit(){
      //提交成功，进入支付界面
      this.$router.push('/beforePay')
    },
    onClickLeft(){
      //提交失败，进入订单状态界面
      this.$router.go(-1)
    },
    address(){
      this.$router.push('/addressSelect')
    }
  }

}
</script>

<style scoped>

</style>