<template>
  <div>
    <p class="title">个人中心</p>
      <van-cell-group title="个人信息">
        <van-button round  type="info" plain size="small" native-type="submit" @click="edit">修改信息</van-button>
        <van-cell title="账户" :value="customer.account"/>
        <van-cell title="昵称" :value="customer.nickyname" />
        <van-cell title="手机号" :value="customer.phone" />
        <van-cell title="性别" :value="customer.sex" />

        <van-row>
          <van-col span="13">
            <van-cell title="修改登录密码"/>
          </van-col>
          <van-col span="6"></van-col>
          <van-col span="5">
            <van-button icon="edit" @click="editPwd"></van-button>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="13">
            <van-cell title="查看所有订单" />
          </van-col>
          <van-col span="6"></van-col>
          <van-col span="5">
            <van-button icon="balance-list" to="state"></van-button>
          </van-col>
        </van-row>

        <van-row>
          <van-col span="13">
            <van-cell title="收货地址"/>
          </van-col>
          <van-col span="6"></van-col>
          <van-col span="5">
            <van-button icon="location" @click="address"></van-button>
          </van-col>
        </van-row>

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
      customer: {
        account:"007",
        nickyname: 'hlo',
        phone:13545878954,
        sex: '男'
      }
    };
  },
  methods: {
    logout() {
      this.$router.push({
        path: '/login'
      })
    },
    edit() {
      var customer = this.customer
      this.$router.push({
        path: '/edit', query: {customer}
      })
    },
    editPwd() {
      var customer = this.customer
      this.$router.push({
        path: '/editPwd', query: {customer}
      })
    },
    address() {
      this.$router.push({
        path:'./addressMs',
      })
    }
  }
}
</script>

<style scoped>

</style>