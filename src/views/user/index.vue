<template>
  <div>
    <p class="title">个人中心</p>
      <van-cell-group title="个人信息">
        <van-button round  type="info" plain size="small" native-type="submit" @click="edit">修改信息</van-button>
        <div class="my-form">
          <van-cell title="账户" :value="customer.account"/>
          <van-cell title="昵称" :value="customer.nickyName" />
          <van-cell title="手机号" :value="customer.phone" />
          <van-cell title="性别" :value="customer.sex" />
        </div>

        <div class="my-form">
        <van-row>
          <van-col span="13">
            <van-cell title="修改登录密码"/>
          </van-col>
          <van-col span="6"></van-col>
          <van-col span="5">
            <van-button @click="editPwd">
              <van-icon name="arrow" />
            </van-button>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="13">
            <van-cell title="查看所有订单"/>
          </van-col>
          <van-col span="6"></van-col>
          <van-col span="5">
            <van-button @click="">
              <van-icon name="arrow" />
            </van-button>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="13">
            <van-cell title="管理收货地址"/>
          </van-col>
          <van-col span="6"></van-col>
          <van-col span="5">
            <van-button @click="">
              <van-icon name="arrow" />
            </van-button>
          </van-col>
        </van-row>
        </div>

      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round  type="info" size="small" native-type="submit" @click="logout">退出登录</van-button>
      </div>
  </div>

</template>

<script>
export default {
  name: "User",
  data() {
    return {
      customer: this.$route.query.customer
    };
  },
  methods: {
    logout() {
      this.$router.push({
        path: '/login'
      })
    },
    edit() {
      var customer=this.customer
      this.$router.push({
        path: '/edit',query: {customer}
      })
    },
    editPwd(){
      var customer=this.customer
      this.$router.push({
        path: '/editPwd',query: {customer}
      })
    }
  }
}
</script>

<style scoped>
  .title {
    /* border-radius: 15px; */
    size:1px;
    height: 50px;
    line-height: 50px;
    background-color: #20a0ff;
    color: #fff;
    text-align: center;
  }
  .my-form{
    text-align: left;
    margin-left: 30px;
  }
</style>